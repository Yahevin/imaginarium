const sql = require('../mixins/sqlCommands');
const gameSt = require('../mixins/gameStatus');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');
const getRandomPartyName = require('../mixins/getRandomPartyName');

module.exports = {
  async create(app, db) {
    const created_at = new Date().getTime();
    const game_name = getRandomPartyName();
    const format = db.format(sql.ii4, [
      'room',
      'game_action',
      'game_name',
      'created_at',
      'player_count',
      gameSt.start,
      game_name,
      created_at,
      1,
    ]);
    const results = await dbQuery(format, db);

    if (results.hasOwnProperty('insertId')) {
      return results.insertId;
    }
    throw 'Party create failed. The insert id unknown';
  },
  async exist(app, db, room_id) {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results = await dbQuery(format, db);

    return isNotEmpty(results);
  },
  async addPlayer(app, db, user_id, room_id, game_master) {
    const format = db.format(sql.ii4, [
      'user__room',
      'room_id',
      'user_id',
      'game_master',
      'is_active',
      room_id,
      user_id,
      game_master,
      true,
    ]);
    await dbQuery(format, db);

    return { success: true };
  },
  async getUsersIn(app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    return await dbQuery(format, db);
  },
  async getUsersIdList(app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.user_id;
      });
    }
    throw 'The getUsersIdList failed. There is no users in this room';
  },
  async getPlayersIdList(app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.id;
      });
    }
    throw 'The getPlayersIdList failed. There is no users in this room';
  },
  async getPlayersList(app, db, room_id) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getPlayersList failed. There is no users in this room';
  },
  async getActivePlayersList(app, db, room_id) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'is_active', true]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getActivePlayersList failed. There is no users in this room';
  },
  async getActivePlayersIdList(app, db, room_id) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'is_active', true]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.id;
      });
    }
    throw 'The getActivePlayersIdList failed. There is no users in this room';
  },
  async setStatus(app, db, room_id, game_action) {
    const format = db.format(sql.usw, ['room', 'game_action', game_action, 'id', room_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async getStatus(app, db, room_id) {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results) && results[0].hasOwnProperty('game_action')) {
      return results[0].game_action;
    }
    throw 'The getStatus failed. There is no users in this room';
  },
  async getPlayersCount(app, db, room_id) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'is_active', true]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.length;
    }
    throw 'All players are inactive';
  },
  async countUpdate(app, db, room_id, new_count) {
    const format = db.format(sql.usw, ['room', 'player_count', new_count, 'id', room_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async includesUser(app, db, user_id, room_id) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'user_id', user_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return {
        user_exist: true,
        player_id: results[0].id,
      };
    }
    return {
      user_exist: false,
      player_id: null,
    };
  },
  async playerJoin(app, db, player_id) {
    const format = db.format(sql.usw, ['user__room', 'is_active', true, 'id', player_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async playerLeave(app, db, player_id) {
    const format = db.format(sql.usw, ['user__room', 'is_active', false, 'id', player_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async demoteGM(app, db, room_id) {
    const format = db.format(sql.usww, ['user__room', 'game_master', false, 'game_master', true, 'room_id', room_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async getMyReincarnations(app, db, user_id) {
    const format = db.format(sql.sfw, ['user__room', 'user_id', user_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'User has`t recent games';
  },
  async getRoom(app, db, room_id) {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'This room not exist';
  },
  async getRoomsList(app, db, room_id_list) {
    const format = db.format(sql.sfwi, ['room', 'id', room_id_list]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'This room not exist';
  },
};
