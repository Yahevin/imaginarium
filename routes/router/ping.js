const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	
	app.post('/ping', async (req, res) => {
		let roomId = req.body.room_id,
			userId = req.body.user_id,
			resp = {};
		
		function getUser(resolve) {
			let getUsersIdReq = db.format(sql.sfw, ['users', 'id', userId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				if (results.length > 0) {
					resp.gameMaster = results[0].game_master;
				}
				return resolve();
			});
		}
		
		function getRoom() {
			let getUsersIdReq = db.format(sql.sfw, ['room', 'id', roomId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				if (results.length > 0) {
					resp.gameAction = results[0].game_action;
				}
				res.json(resp);
			});
		}
		
		new Promise(resolve => {
			getUser(resolve);
		}).then(() => {
			getRoom();
		});
	});
};
