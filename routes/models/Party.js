const sql = require('../mixins/sqlCommands');

module.exports = {
	getUsersIn: async function (app, db, roomId) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results);
			});
		}).catch((error) => {
			console.log(error);
			return [];
		})
	},
	getUsersIdList: async function (app, db, roomId) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfw, ['user__room', 'room_id', roomId]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				
				let users = results.map((item) => {
					return item.user_id;
				});
				return resolve(users);
			});
		}).catch((error) => {
			console.log(error);
			return [];
		})
	},
	getPlayersCount: async function (app, db, room_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfw, ['room', 'id', room_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results[0].player_count);
			});
		}).catch((error) => {
			console.log(error);
			return 0;
		})
	},
};