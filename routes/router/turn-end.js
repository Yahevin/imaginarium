const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');


module.exports = function(app, db) {
	app.post('/turn-end', async (req, res) => {
		let roomId = req.body.room_id,
			usersId = [],
			users = [],
			gmId = null;
		
		function changeGameStatus(resolve) {
			let changeGameStatusReq = db.format(sql.usw, ['room', 'game_action', gameSt.start, 'id', roomId]);
			db.query(changeGameStatusReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		function getUsers(resolve) {
			let getUsersId = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
			db.query(getUsersId, function (err, results) {
				if (err) throw err;
				results.forEach((item) => {
					usersId.push(item.user_id);
				});
				return resolve();
			});
		}
		
		function findGM(resolve) {
			usersId.forEach((currentId, index) => {
				let getUsers = db.format(sql.sfw, ['users', 'id', currentId]);
				db.query(getUsers, function (err, results) {
					if (err) throw err;
					results.forEach((item) => {
						users.push(item);
						if (item.game_master) {
							gmId = item.id
						}
					});
					if (index >= (usersId.length - 1)) {
						return resolve();
					}
				});
			});
		}
		
		function demoteGM(resolve) {
			let demoteMeReq = db.format(sql.usw, ['users', 'game_master', false, 'id', gmId]);
			db.query(demoteMeReq, function (err, results) {
				if (err) throw err;
				return resolve();
			});
		}
		
		function findNewGM() {
			let current = 0,
				next;
			
			users.forEach((item, index) => {
				if (+item.id === +gmId) {
					current = index;
				}
			});
			if (current < (users.length - 1)) {
				next = users[current + 1];
			} else {
				next = users[0];
			}
			
			
			let setGM = db.format(sql.usw, ['users', 'game_master', true, 'id', next.id]);
			db.query(setGM, function (err, results) {
				if (err) throw err;
				res.json({success: true});
			});
		}
		
		new Promise(resolve => {
			changeGameStatus(resolve);
		}).then(() => {
			new Promise(resolve => {
				getUsers(resolve)
			}).then(() => {
				new Promise(resolve => {
					findGM(resolve)
				}).then(() => {
					new Promise(resolve => {
						demoteGM(resolve)
					}).then(() => {
						findNewGM()
					})
				})
			})
		});
	});
};