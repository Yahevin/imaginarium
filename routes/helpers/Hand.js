const sql = require('../mixins/sqlCommands');
const cardStatus = require('../mixins/cardStatus');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
	getCards: async function (app, db, player_id) {
	  const format = db.format(sql.sfww, ['card', 'player_id', player_id, 'status', cardStatus.hand]);
		const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('The getCards failed. There is no cards in his hand');
    }
	},
  moveToTable: async function (app, db, card_id) {
    const format = db.format(sql.usw, ['card', 'status', cardStatus.table, 'id', card_id]);

    await dbQuery(format,db);

    return {success: true};
  },
};
