const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
  async createQuestion(app, db, room_id, question = '', card_id = null) {
    const format = db.format(sql.ii3, ['question', 'room_id', 'question', 'card_id', room_id, question, card_id]);

    await dbQuery(format, db);

    return { success: true };
  },
  async setQuestion(app, db, room_id, question, card_id) {
    const format = db.format(sql.ussw, ['question', 'question', question, 'card_id', card_id, 'room_id', room_id]);

    await dbQuery(format, db);

    return { success: true };
  },
  async getQuestion(app, db, room_id) {
    const format = db.format(sql.sfw, ['question', 'room_id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results) && results[0].hasOwnProperty('question')) {
      return results[0].question;
    }
    throw 'Question in not exist';
  },
  async clearQuestion(app, db, room_id) {
    const format = db.format(sql.ussw, ['question', 'question', '', 'card_id', null, 'room_id', room_id]);

    await dbQuery(format, db);

    return { success: true };
  },
  async clearGuess(app, db, basket_id) {
    const format = db.format(sql.dfw, ['guess', 'basket_id', basket_id]);
    const results = await dbQuery(format, db);

    return isNotEmpty(results);
  },
  async make(app, db, player_id, card_id, basket_id) {
    const format = db.format(sql.ii3, ['guess', 'player_id', 'card_id', 'basket_id', player_id, card_id, basket_id]);

    await dbQuery(format, db);

    return { success: true };
  },
  async getVoteList(app, db, players_id_list) {
    const format = db.format(sql.sfwi, ['guess', 'player_id', players_id_list]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'Nobody had voted';
  },
  async alReady(app, db, player_id) {
    const format = db.format(sql.sfw, ['guess', 'player_id', player_id]);
    const results = await dbQuery(format, db);

    return isNotEmpty(results);
  },
};
