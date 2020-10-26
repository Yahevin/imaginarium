const sql = require('../mixins/sqlCommands');
const cardStatus = require('../mixins/cardStatus');
const isNotEmpty = require('../mixins/isNotEmpty');
const dbQuery = require('../mixins/dbQuery');

module.exports = {
	putCard: async function (app, db, card_id, is_main = false) {
    const format = db.format(sql.ussw, ['card', 'status', cardStatus.table, 'is_main', is_main, 'id', card_id]);
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
  alreadyPut: async function (app, db, player_id) {
    const format = db.format(sql.sfww, ['card', 'player_id', player_id, 'status', cardStatus.table]);
    const results = await dbQuery(format,db);

    return isNotEmpty(results);
  },
  getCardsList: async function (app, db, basket_id) {
    const format = db.format(sql.sfww,  ['card', 'basket_id', basket_id, 'status', cardStatus.table]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('There is no such cards on the table');
    }
  },
  getPlayersCards: async function (app, db, players_id_list) {
    const format = db.format(sql.sfwwi,  ['card', 'status', cardStatus.table, 'player_id', players_id_list]);
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