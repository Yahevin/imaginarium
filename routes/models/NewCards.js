const sql = require('../mixins/sqlCommands');

module.exports = {
	setCards: function (app, db, users_id_list, card_pool, cards_count) {
		let row = [];
		return new Promise(async (resolve, reject) => {
			users_id_list.forEach((user_id) => {
				for (let i = 0; i < cards_count; i++) {
					row.push([user_id, card_pool[i].id, card_pool[i].img_url]);
				}
				card_pool.splice(0, cards_count);
			});
			let reqFormat = db.format(sql.im3, ['new_cards', 'user_id','card_id','img_url', row]);

      db.query (reqFormat, function (err, results) {
        if (err) return reject (err);
        return resolve (true);
      });
		}).catch((error) => {
      throw {desc: 'Function failed:setCards', detail: error};
		})
	},
};