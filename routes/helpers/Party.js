const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
  create: async function (app, db) {
    const format = db.format(sql.ii2, ['room', 'game_action','player_count', gameSt.prepare, 1]);
    const results = await dbQuery(format,db);

    if (results.hasOwnProperty('insertId')) {
      return results.insertId;
    } else {
      throw ('Party create failed. The insert id unknown');
    }
  },
  exist: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results = await dbQuery(format,db);

    return isNotEmpty(results);
  },
  addPlayer: async function (app, db, room_id, user_id) {
    const format = db.format(sql.ii2, ['user__room', 'room_id', 'user_id', room_id, user_id]);
    await dbQuery(format,db);

    return {success: true};
  },
	getUsersIn: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    return await dbQuery(format,db);
	},
	getUsersIdList: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results)) {
      return results.map ((item) => {
        return item.user_id;
      });
    } else {
      throw ('The getUsersIdList failed. There is no users in this room');
    }
	},
	getPlayersCount: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results = await dbQuery(format,db);

    if (isNotEmpty(results) && results[0].hasOwnProperty('player_count')) {
      return results[0].player_count;
    } else {
      throw ('The getPlayersCount failed. There is no users in this room');
    }
	},
  countUpdate: async function (app, db, new_count, room_id) {
    const format = db.format(sql.usw, ['room', 'player_count', new_count, 'id', room_id]);
    await dbQuery(format,db);

    return {success: true};
  }
};
