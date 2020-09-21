const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');
const cardStatus = require('../mixins/cardStatus');

module.exports = {
  getCards: async function (app, db, room_id) {
    const format = db.format(sql.sfww, ['cards', 'room_id', room_id, 'status', cardStatus.basket]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return resolve(results);
    } else {
      throw ('There is no cards in basket');
    }
  },
  getSelf: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['basket', 'room_id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return resolve(results[0].id);
    } else {
      throw ('Basket does`t exist');
    }
  },
  clear: async function (app, db, basket_id) {
    const format = db.format(sql.dfw, ['basket', 'id', basket_id]);
    await dbQuery(format, db);

    return {success: true};
  },
  create: async function (app, db, room_id) {
    const format = db.format(sql.ii1, ['basket', 'room_id', room_id]);
    const result = await dbQuery(format, db);

    if (result.hasOwnProperty('insertId')) {
      return result.insertId;
    } else {
      throw ('Basket did`t created');
    }
  },
};
