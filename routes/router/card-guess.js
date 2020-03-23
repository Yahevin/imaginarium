const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');


module.exports = function(app, db) {
	app.post('/card-guess', async (req, res) => {
		let userId = req.body.user_id,
			roomId = req.body.room_id,
			guessId = req.body.guess_id,
			playerStyle = req.body.player_style,
			iAmLast = false,
			userCount = 0,
			userGuessed = 0,
			userIds = [],
			checked = false;
		
		function checkPlayer(resolve) {
			let checkPlayerReq = db.format(sql.sfw,
				['user__table', 'user_id', userId]);
			
			db.query(checkPlayerReq, function (err, results) {
				if (err) throw err;
				if (results[0].hasOwnProperty('table_card_id')) {
					checked = results[0].table_card_id !== parseInt(guessId);
				}
				return resolve();
			});
		}
		
		function makeGuessCard(resolve) {
			let makeGuessCardReq = db.format(sql.ii3,
				['user__guess', 'user_id', 'guess_id', 'player_style', userId, guessId, playerStyle]);
			
			db.query(makeGuessCardReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		function getCounts(resolveMain) {
			new Promise(resolve => {
				getUsersId(resolve);
			}).then(() => {
				new Promise(resolve => {
					getGuessedUsers(resolve);
				}).then(() => {
					iAmLast = userGuessed === (userCount - 1);
					return resolveMain();
				})
			});
		}
		
		function getUsersId(resolve) {
			let getUsersIdReq = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				userCount = results.length;
				userIds = results.map((item) => {
					return item.user_id;
				});
				return resolve();
			});
		}
		
		function getGuessedUsers(resolve) {
			userIds.forEach((currentId, index) => {
				let getGuessedUsersReq = db.format(sql.sfw, ['user__guess', 'user_id', currentId]);
				db.query(getGuessedUsersReq, function (err, results) {
					if (err) throw err;
					if (results.length > 0) {
						userGuessed++;
					}
					if (index >= (userIds.length - 1)) {
						return resolve();
					}
				});
			});
		}
		
		function changeGameStatus() {
			let changeGameStatusReq = db.format(sql.usw,
				['room', 'game_action', gameSt.allGuessDone, 'id', roomId]);
			db.query(changeGameStatusReq, function (err, results) {
				if (err) throw err;
				res.json({success: true, iAmLast: true});
			});
		}
		
		new Promise(resolve => {
			checkPlayer(resolve);
		}).then(() => {
			if (checked) {
				new Promise(resolve => {
					makeGuessCard(resolve);
				}).then(() => {
					new Promise(resolve => {
						getCounts(resolve);
					}).then(() => {
						if (iAmLast) {
							changeGameStatus();
						} else {
							res.json({success: true, iAmLast: false});
						}
					})
				});
			} else {
				res.json({success: false});
			}
		})
	});
}