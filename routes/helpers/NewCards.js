const sql = require('../mixins/sqlCommands');
const cardStatus = require('../mixins/cardStatus');
const dbQuery = require('../mixins/dbQuery');

module.exports = {
	setCards: async function (app, db, room_id, users_id_list, card_pool, cards_count) {
		const row = users_id_list.map((user_id) => {
      for (let i = 0; i < cards_count; i++) {
        row.push([
          card_pool[i].img_url,
          card_pool[i].id,
          user_id,
          room_id,
          cardStatus.new
        ]);
      }
      card_pool.splice(0, cards_count);
    });
    const format = db.format(sql.im5, ['cards' ,'img_url', 'origin_id', 'user_id', 'room_id', 'status', row]);

    await dbQuery(format,db);

    return {success: true};
	},
};
