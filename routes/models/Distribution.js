const sql = require('../mixins/sqlCommands');

module.exports = {
	getSortedByRoom: async function (app, db, room_id) {
		return new Promise(async (resolve) => {
			let format = db.format(sql.sfw, ['distribution', 'room_id', room_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results[0].id);
			});
		}).catch((error) => {
			console.log(error);
			return 0;
		})
	},
	getCardShelter: async function (app, db) {
		return new Promise(async (resolve) => {
			let format = db.format(sql.sf, ['cards']);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results);
			});
		}).catch((error) => {
			console.log(error);
			return [];
		})
	},
};