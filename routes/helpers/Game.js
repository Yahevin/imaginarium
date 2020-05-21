const sql = require('../mixins/sqlCommands');

module.exports = {
	status: async function (app, db, user_id) {
		return new Promise(async (resolve, reject) => {
			let format = '';
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results);
			});
		}).catch((error) => {
			console.log(error);
			return false;
		})
	},
	setStatus: async function (app, db, game_status, room_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.usw, ['room', 'game_action', game_status, 'id', room_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
		}).catch((error) => {
			console.log(error);
			return false;
		})
	},
};