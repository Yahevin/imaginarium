const sql = require('../mixins/sqlCommands');


module.exports = function(app, db) {
	app.post('/leader-board', async (req, res) => {
		let roomId = req.body.room_id,
			users = [],
			resp = [];
		
		function getUsersId(resolve) {
			let getUsersIdReq = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
			db.query(getUsersIdReq, function (err, results) {
				if (err) throw err;
				users = results;
				return resolve();
			});
		}
		
		function getUsers() {
			users.forEach((user, index) => {
				let getUsersReq = db.format(sql.sfw, ['users', 'id', user.id]);
				db.query(getUsersReq, function (err, results) {
					if (err) throw err;
					resp.push(results[0]);
					if (index >= (users.length - 1)) {
						res.json(resp);
					}
				});
			});
		}
		
		new Promise(resolve => {
			getUsersId(resolve);
		}).then(() => {
			getUsers();
		});
	});
};