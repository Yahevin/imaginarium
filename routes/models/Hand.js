const sql = require('../mixins/sqlCommands');

module.exports = {
	getUsersCardList: async function (app, db, user_id) {
		return new Promise(async (resolve) => {
			let format = db.format(sql.sfw, ['user__hand', 'user_id', user_id]);
			
			return db.query(format, function (err, results) {
				if (err) throw err;
				return resolve(results);
			});
		});
	},
	getCards: async function (app, db, hand_id_list) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfwi, ['cards_in_hand', 'id', hand_id_list]);
			
			return db.query(format, (err, results) => {
				if (err) return reject(err);
				
				return resolve(results);
			});
		}).catch((err) => {
			return [];
		})
	},
	getSortedByRoom: async function (app, db, room_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfw, ['room__hand', 'room_id', room_id]);
			
			return db.query(format, function (err, results) {
				if (err) reject(err);
				
				const hand_id_list = results.map((item) => {
					return item.hand_card_id;
				});
				
				return resolve(hand_id_list);
			});
		}).catch((err) => {
			return [];
		})
	},
};