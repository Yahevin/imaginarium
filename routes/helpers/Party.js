const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
  create: async function (app, db) {
    const format = db.format(sql.ii2, ['room', 'game_action', 'player_count', gameSt.start, 1]);
    const results = await dbQuery(format, db);

    if (results.hasOwnProperty('insertId')) {
      return results.insertId;
    } else {
      throw ('Party create failed. The insert id unknown');
    }
  },
  exist: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results = await dbQuery(format, db);

    return isNotEmpty(results);
  },
  addPlayer: async function (app, db, user_id, room_id, game_master) {
    const format = db.format(sql.ii4, ['user__room',
      'room_id', 'user_id', 'game_master', 'is_active',
      room_id, user_id, game_master, true]);
    await dbQuery(format, db);

    return {success: true};
  },
  getUsersIn: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    return await dbQuery(format, db);
  },
  getUsersIdList: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.user_id;
      });
    } else {
      throw ('The getUsersIdList failed. There is no users in this room');
    }
  },
  getPlayersIdList: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.id;
      });
    } else {
      throw ('The getPlayersIdList failed. There is no users in this room');
    }
  },
  getPlayersList: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id']);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('The getPlayersList failed. There is no users in this room');
    }
  },
  getActivePlayersList: async function (app, db, room_id) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'is_active', true]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    } else {
      throw ('The getActivePlayersList failed. There is no users in this room');
    }
  },
  getActivePlayersIdList: async function (app, db, room_id) {
    const results = await getActivePlayersList(app, db, room_id);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.id
      })
    } else {
      throw ('The getActivePlayersIdList failed. There is no users in this room');
    }
  },
  setStatus: async function (app, db, room_id, game_action) {
    const format = db.format(sql.usw, ['room', 'game_action', game_action, 'id', room_id]);
    await dbQuery(format, db);

    return {success: true};
  },
  getStatus: async function (app, db, room_id) {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results) && results[0].hasOwnProperty('game_action')) {
      return results[0].game_action;
    } else {
      throw ('The getStatus failed. There is no users in this room');
    }
  },
  getPlayersCount: async function (app, db, room_id) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'is_active', true]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.length;
    } else {
      throw ('All players are inactive');
    }
  },
  countUpdate: async function (app, db, room_id, new_count) {
    const format = db.format(sql.usw, ['room', 'player_count', new_count, 'id', room_id]);
    await dbQuery(format, db);

    return {success: true};
  },
  includesUser: async function (app, db, user_id, room_id,) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'user_id', user_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return {
        user_exist: true,
        player_id: results[0].id
      }
    } else {
      return {
        user_exist: false,
        player_id: null
      }
    }
  },
  playerJoin: async function (app, db, player_id) {
    const format = db.format(sql.usw, ['user__room', 'is_active', true, 'id', player_id]);
    await dbQuery(format, db);

    return {success: true};
  },
  playerLeave: async function (app, db, player_id) {
    const format = db.format(sql.usw, ['user__room', 'is_active', false, 'id', player_id]);
    await dbQuery(format, db);

    return {success: true};
  },
  demoteGM: async function (app, db, room_id) {
    const format = db.format(sql.usww, ['user__room', 'game_master', false, 'game_master', true, 'room_id', room_id]);
    await dbQuery(format, db);

    return {success: true};
  },
};
