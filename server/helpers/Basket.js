const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');
const cardStatus = require('../mixins/cardStatus');

module.exports = {
  async getSelf(app, db, room_id) {
    const format = db.format(sql.sfw, ['basket', 'room_id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results[0].id;
    }
    throw 'Basket does`t exist';
  },
  async clear(app, db, basket_id) {
    const format = db.format(sql.dfw, ['basket', 'id', basket_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async create(app, db, room_id) {
    const format = db.format(sql.ii1, ['basket', 'room_id', room_id]);
    const result = await dbQuery(format, db);

    if (result.hasOwnProperty('insertId')) {
      return result.insertId;
    }
    throw 'Basket did`t created';
  },
};
