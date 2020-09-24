const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
  createQuestion: async function (app, db, room_id, question = '', card_id = null) {
    const format = db.format(sql.ii3, ['question', 'room_id', 'question', 'card_id', room_id, question, card_id]);

    await dbQuery(format,db);

    return {success: true};
  },
  setQuestion: async function (app, db, room_id, question, card_id) {
    const format = db.format(sql.ussw, ['question', 'question', question, 'card_id', card_id, 'room_id', room_id]);

    await dbQuery(format,db);

    return {success: true};
  },
  getQuestion: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['question', 'room_id', room_id]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results) && results[0].hasOwnProperty('question')) {
      return results[0].question;
    } else {
      throw ('Question in not exist');
    }
  },
  clearQuestion: async function (app, db, room_id) {
    const format = db.format(sql.ussw, ['question', 'question', '', 'card_id', null, 'room_id', room_id]);

    await dbQuery(format,db);

    return {success: true};
  },
  clearGuess: async function (app, db, basket_id) {
    const format = db.format(sql.dfw, ['guess', 'basket_id', basket_id]);
    const results = await dbQuery(format,db);

    return isNotEmpty(results);
  },
  make: async function (app, db, player_id, card_id, basket_id) {
    const format = db.format(sql.ii3, ['guess', 'player_id', 'card_id', 'basket_id', player_id, card_id, basket_id]);

    await dbQuery(format,db);

    return {success: true};
  },
  getVoteList: async function (app, db, players_id_list) {
    const format = db.format(sql.sfwi, ['guess', 'player_id', players_id_list]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('Nobody had voted');
    }
  },
  alReady: async function (app, db, player_id) {
    const format = db.format(sql.sfw, ['guess', 'player_id', player_id]);
    const results = await dbQuery(format,db);

    return isNotEmpty(results);
  },
};

