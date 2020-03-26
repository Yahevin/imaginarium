const sql = require('../mixins/sqlCommands');

module.exports = {
	putCard: async function (app, db, img_url, card_id, is_main) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.ii3, ['cards_on_table', 'img_url', 'card_id', 'is_main', img_url, card_id, is_main]);
			db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results.insertId);
			});
		}).catch((error) => {
			console.log(error);
			return null;
		})
	},
	noteTheCard: async function (app, db, user_id, room_id, table_card_id, card_id, is_main) {
		await this.noteToUser.apply(arguments);
		await this.noteToRoom.apply(arguments);
	},
	noteToUser: async function (app, db, user_id, room_id, table_card_id, card_id, is_main) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.ii3,
				['user__table', 'user_id', 'table_card_id', 'is_main', user_id, table_card_id, is_main]);
			
			db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
			
		}).catch((error) => {
			console.log(error);
			return false;
		})
	},
	noteToRoom: async function (app, db, user_id, room_id, table_card_id, card_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.ii3,
				['room__table', 'room_id', 'table_card_id', 'card_id', room_id, table_card_id, card_id]);
			
			db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
		}).catch((error) => {
			console.log(error);
			return false;
		})
	},
	getCardsCount: async function (app, db, room_id) {
		return new Promise(async (resolve, reject) => {
			let format = db.format(sql.sfw, ['room__table', 'room_id', room_id]);
			
			db.query(format, function (err, results) {
				if (err) reject(err);
				return resolve(results.length);
			});
		}).catch((error) => {
			console.log(error);
			return false;
		})
	},
};