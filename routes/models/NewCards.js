const sql = require('../mixins/sqlCommands');

module.exports = {
	setCards: async function (app, db, users_id_list, card_pool, cards_count) {
		let row = [];
		return new Promise(async (resolve, reject) => {
			users_id_list.forEach((user_id) => {
				for (let i = 0; i < cards_count; i++) {
					row.push([card_pool[i], user_id]);
				}
				card_pool.splice(0, cards_count);
			});
			
			let reqFormat = db.format(sql.im2, ['new_cards', 'card_id', 'user_id', row]);
			
			db.query(reqFormat, function (err, results) {
				if (err) reject(err);
				return resolve(true);
			});
		}).catch(() => {
			return false;
		})
	},
};