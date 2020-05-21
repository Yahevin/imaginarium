const sql = require('../mixins/sqlCommands');
const cardStatus = require('../mixins/cardStatus');
const isNotEmpty = require('../mixins/isNotEmpty');
const dbQuery = require('../mixins/dbQuery');

module.exports = {
	putCard: async function (app, db, card_id) {
    const format = db.format(sql.usw, ['cards', 'status', cardStatus.table, 'card_id', card_id]);
    await dbQuery(format,db);

    return {success: true};
	},
  getCard: async function (app, db, user_id, room_id) {
    const format = db.format(sql.sfwww, ['user__table', 'user_id', user_id, 'room_id', room_id, 'status', cardStatus.table]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results[0];
    } else {
      throw ('There is no users card on the table');
    }
  },
  getCards: async function (app, db, room_id) {
    const format = db.format(sql.sfww,  ['cards', 'room_id', room_id, 'status', cardStatus.table]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results[0];
    } else {
      throw ('There is no such cards on the table');
    }
  },
  getCardsCount: async function (app, db, room_id) {
    const format = db.format (sql.sfww, ['cards', 'room_id', room_id, 'status', cardStatus.table]);
    const results = await dbQuery(format,db);

    return results.length;
  },
  clear: async function (app, db, room_id, basket_id) {
    const format = db.format(sql.ussww, ['cards', 'status', cardStatus.basket, 'basket_id', basket_id, 'room_id', room_id, 'status', cardStatus.table]);
    await dbQuery(format,db);

    return {success: true};
  },
};
