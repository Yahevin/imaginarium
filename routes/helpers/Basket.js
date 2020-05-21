const sql = require('../mixins/sqlCommands');

module.exports = {
	getCards: async function (app, db, distribution_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfw, ['in_basket', 'distribution_id', distribution_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results);
			});
		}).catch((error) => {
			console.log(error);
			return [];
		})
	},
	clear: async function (app, db, distribution_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.dfw, ['distribution', 'id', distribution_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
		}).catch((error) => {
			console.log(error);
			return false;
		});
	},
	add: async function (app, db, room_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.ii1, ['distribution', 'room_id', room_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
		}).catch((error) => {
			console.log(error);
			return false;
		});
	},
};