const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
	getStatus: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['room', 'room_id', room_id]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results[0].game_action;
    } else {
      throw ('Room did not found');
    }
	},
	setStatus: async function (app, db, room_id, game_status ) {
    const format = db.format(sql.usw, ['room', 'id', room_id, 'game_action', game_status]);

    await dbQuery(format,db);

    return {success: true};
	},
};
