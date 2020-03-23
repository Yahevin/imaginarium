const sql = require('../mixins/sqlCommands');

module.exports = {
	getUsersCardList: async function (app, db, userId) {
		return new Promise(async (resolve) => {
			let format = db.format(sql.sfw, ['user__hand', 'user_id', userId]);
			
			return db.query(format, function (err, results) {
				if (err) throw err;
				return resolve(results);
			});
		});
	},
	getCards: async function (app, db, usersCardsList) {
		return new Promise(async (resolve) => {
			let format = db.format(sql.sfwi, ['cards_in_hand', 'id', usersCardsList]);
			
			return db.query(format, function (err, results) {
				if (err) throw err;
				return resolve(results);
			});
		});
	},
};