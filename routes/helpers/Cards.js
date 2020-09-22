const sql = require('../mixins/sqlCommands');
const cardStatus = require('../mixins/cardStatus');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
  getExistingCards: async function (app, db, players_id_list) {
    const format = db.format(sql.sfwi, ['cards', 'player_id', players_id_list]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('The getExistingCards failed. There is no cards in his hand');
    }
  },
  getCardShelter: async function (app, db) {
    const format = db.format(sql.sf, ['card']);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return resolve(results);
    } else {
      throw ('Cards are lost');
    }
  },
  getNew: async function (app, db, basket_id) {
    const format = db.format(sql.sfww, ['card', 'basket_id', basket_id, 'status', cardStatus.new]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('The getNew failed. There is no new cards ready');
    }
  },
  getHand: async function (app, db, player_id) {
    const format = db.format(sql.sfww, ['card', 'player_id', player_id, 'status', cardStatus.hand]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('The getCards failed. There is no cards in his hand');
    }
  },
  getAllMy: async function (app, db, player_id) {
    const format = db.format(sql.sfwwi, ['card', 'player_id', player_id, 'status', [cardStatus.hand, cardStatus.table]]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('The getAllMy failed. There is no cards in his hand and table');
    }
  },
  mixBasket: async function (app, db, basket_id) {
    const format = db.format(sql.usw, ['card', 'status', cardStatus.new, 'basket_id', basket_id]);
    await dbQuery(format, db);

    return {success: true};
  },
  noteTaken: async function (app, db, player_id, cards_id_list) {
    const format = db.format(sql.uswwi, ['card', 'status', cardStatus.hand, 'player_id', 'id', cards_id_list]);
    await dbQuery(format, db);

    return {success: true};
  },
  createPool: async function (app, db, new_cards) {
    const format = db.format(sql.im5, ['cards' ,'img_url', 'origin_id', 'player_id', 'basket_id', 'status', new_cards]);

    await dbQuery(format, db);

    return {success: true};
  }
};
