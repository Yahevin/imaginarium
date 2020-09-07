const sql = require('../mixins/sqlCommands');
const cardStatus = require('../mixins/cardStatus');
const isNotEmpty = require('../mixins/isNotEmpty');
const dbQuery = require('../mixins/dbQuery');

module.exports = {
	putCard: async function (app, db, card_id) {
    const format = db.format(sql.usw, ['card', 'status', cardStatus.table, 'card_id', card_id]);
    await dbQuery(format,db);

    return {success: true};
	},
  getCard: async function (app, db, player_id) {
    const format = db.format(sql.sfww, ['card', 'player_id', player_id, 'status', cardStatus.table]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results[0];
    } else {
      throw ('There is no user`s card on the table');
    }
  },
  getCardsList: async function (app, db, room_id) {
    const format = db.format(sql.sfww,  ['card', 'room_id', room_id, 'status', cardStatus.table]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('There is no such cards on the table');
    }
  },
  clear: async function (app, db, room_id, basket_id) {
    const format = db.format(sql.ussww, ['card', 'status', cardStatus.basket, 'basket_id', basket_id, 'room_id', room_id, 'status', cardStatus.table]);
    await dbQuery(format,db);

    return {success: true};
  },
};
