const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
  createQuestion: async function (app, db, room_id, question = '') {
    const format = db.format(sql.ii2, ['question', 'room_id', 'question', room_id, question]);

    await dbQuery(format,db);

    return {success: true};
  },
  setQuestion: async function (app, db, room_id, question) {
    const format = db.format(sql.usw, ['question', 'room_id', room_id, 'question', question]);

    await dbQuery(format,db);

    return {success: true};
  },
  getQuestion: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['question', 'room_id', room_id]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results) && results[0].hasOwnProperty('question')) {
      return results[0].question
    } else {
      throw ('Question in not exist');
    }
  },
  make: async function (app, db, player_id, card_id) {
    const format = db.format(sql.ii2, ['guess', 'player_id', player_id, 'card_id', card_id]);

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
};

