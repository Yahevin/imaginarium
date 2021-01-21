const sql = require('../mixins/sqlCommands');
const cardStatus = require('../mixins/cardStatus');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
  async getExistingCards(app, db, players_id_list) {
    const format = db.format(sql.sfwi, ['cards', 'player_id', players_id_list]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getExistingCards failed. There is no cards in his hand';
  },
  async getCardShelter(app, db) {
    const format = db.format(sql.sf, ['shelter']);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'Cards are lost';
  },
  async getNew(app, db, basket_id) {
    const format = db.format(sql.sfww, ['card', 'basket_id', basket_id, 'status', cardStatus.new]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getNew failed. There is no new cards ready';
  },
  async getHand(app, db, player_id) {
    const format = db.format(sql.sfww, ['card', 'player_id', player_id, 'status', cardStatus.hand]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getCards failed. There is no cards in his hand';
  },
  async getAllMy(app, db, player_id) {
    const format = db.format(sql.sfwwi, [
      'card',
      'player_id',
      player_id,
      'status',
      [cardStatus.hand, cardStatus.table],
    ]);
    return await dbQuery(format, db);
  },
  async moveToBasket(app, db, basket_id) {
    const format = db.format(sql.usww, [
      'card',
      'status',
      cardStatus.basket,
      'basket_id',
      basket_id,
      'status',
      cardStatus.table,
    ]);
    await dbQuery(format, db);

    return { success: true };
  },
  async mixBasket(app, db, basket_id) {
    const format = db.format(sql.usww, [
      'card',
      'status',
      cardStatus.new,
      'basket_id',
      basket_id,
      'status',
      cardStatus.basket,
    ]);
    await dbQuery(format, db);

    return { success: true };
  },
  async noteTaken(app, db, player_id, cards_id_list) {
    const format = db.format(sql.usswi, [
      'card',
      'status',
      cardStatus.hand,
      'player_id',
      player_id,
      'id',
      cards_id_list,
    ]);
    await dbQuery(format, db);

    return { success: true };
  },
  async createPool(app, db, new_cards) {
    const format = db.format(sql.im4, ['card', 'img_url', 'origin_id', 'basket_id', 'status', new_cards]);

    await dbQuery(format, db);

    return { success: true };
  },
};
