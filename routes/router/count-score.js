const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/count-score', async (req, res) => {
		let roomId = req.body.room_id,
			usersId = [],
			users = [],
			cards = [],
			marks = [],
			rewards = [];
		
		function getUsersIds(resolve) {
			let getUsersIdsReq = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
			db.query(getUsersIdsReq, function (err, results) {
				if (err) throw err;
				usersId = results;
				return resolve();
			});
		}
		
		function getUsers(resolve) {
			usersId.forEach((user, index) => {
				let getMarksReq = db.format(sql.sfw, ['users', 'id', user.id]);
				db.query(getMarksReq, function (err, results) {
					if (err) throw err;
					users.push(results[0]);
					if (index >= (usersId.length - 1)) {
						return resolve();
					}
				});
			});
		}
		
		function getMarks(resolve) {
			usersId.forEach((user, index) => {
				let getMarksReq = db.format(sql.sfw, ['user__guess', 'user_id', user.id]);
				db.query(getMarksReq, function (err, results) {
					if (err) throw err;
					if (results.length > 0) {
						marks.push(results[0]);
					}
					if (index >= (users.length - 1)) {
						return resolve();
					}
				});
			});
		}
		
		function getCards(resolve) {
			users.forEach((user, index) => {
				let getCardsReq = db.format(sql.sfw, ['user__table', 'user_id', user.id]);
				db.query(getCardsReq, function (err, results) {
					if (err) throw err;
					cards.push(results[0]);
					if (index >= (users.length - 1)) {
						return resolve();
					}
				});
			});
		}
		
		function countScores(resolve) {
			let max = marks.length;
			
			cards.forEach((card) => {
				let score = 0;
				marks.forEach((mark) => {
					if (card.table_card_id === mark.guess_id) {
						score++;
					}
				});
				
				if (card.is_main) {
					score = score === 0 || score === max
						? score = -3
						: score += 3;
				}
				
				rewards.push({
					id: card.user_id,
					score: score,
				})
			});
			return resolve();
		}
		
		function rewriteScores() {
			rewards.forEach((reward, index) => {
				users.forEach((user) => {
					if (user.id === reward.id) {
						reward.score = +user.score + reward.score;
					}
				});
				
				let rewriteScoresReq = db.format(sql.usw, ['users', 'score', reward.score, 'id', reward.id]);
				db.query(rewriteScoresReq, function (err, results) {
					if (err) throw err;
					if (index >= (rewards.length - 1)) {
						res.json({success: true});
					}
				});
			});
		}
		
		new Promise(resolve => {
			getUsersIds(resolve)
		}).then(() => {
			new Promise(resolve => {
				getUsers(resolve)
			}).then(() => {
				new Promise(resolve => {
					getMarks(resolve)
				}).then(() => {
					new Promise(resolve => {
						getCards(resolve)
					}).then(() => {
						new Promise(resolve => {
							countScores(resolve)
						}).then(() => {
							rewriteScores()
						})
					})
				})
			})
		})
	});
};
