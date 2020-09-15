const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

module.exports = {
  create: async function (app, db, nick_name, password) {
    const format = db.format(sql.ii3, ['user', 'nick_name', 'password', 'score', nick_name, password, 0]);
    const result = await dbQuery(format,db);

    if (result.hasOwnProperty('insertId')) {
      return result.insertId;
    } else {
      throw ('User create failed. The insert id unknown');
    }
  },
  getId: async function (app, db, nick_name, password) {
    const format  = db.format(sql.sfww, ['user', 'nick_name', nick_name, 'password', password]);
    const results = await dbQuery(format,db);

    if(isNotEmpty(results)) {
      return results[0].id;
    } else {
      throw ('Such user not found');
    }
  },
  getList: async function (app, db, users_id_list) {
    const format = db.format(sql.sfwi, ['user', 'id', users_id_list]);
    return await dbQuery(format,db);
  },
  getPlayerId: async function (app, db, user_id, room_id) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'user_id', user_id,]);
    const {id} = await dbQuery(format,db);

    return id;
  },
	gameMaster: async function (app, db, user_id, room_id) {
    const format = db.format(sql.sfww, ['user__room', 'user_id', user_id, 'room_id', room_id]);
    const result = await dbQuery(format,db);

    if (isNotEmpty(result)) {
      return result[0].game_master;
    } else {
      throw ('Did not found such user');
    }
	},
  findGM: async function (app, db, players_id_list) {
    const format = db.format(sql.sfwi, ['user__room', 'id', players_id_list]);
    const results = await dbQuery(format,db);
    const err = 'The findGM failed. Did not found such user';

    if (isNotEmpty(results)) {
      const gm = results.filter((item) => {
        return item.game_master;
      });

      if(gm.length === 0) {
        throw (err);
      } else {
        return gm.id;
      }
    } else {
      throw (err);
    }
  },
  demoteGM: async function (app, db, player_id) {
    const format = db.format(sql.usw, ['user__room', 'game_master', false, 'player_id', player_id]);
    await dbQuery(format,db);

    return {success: true};
  },
  setGM: async function (app, db, player_id) {
    const format = db.format(sql.usw, ['user__room', 'game_master', true, 'player_id', player_id]);
    await dbQuery(format,db);

    return {success: true};
  },
  setStyle: async function (app, db, style, player_id) {
    const format = db.format(sql.usw, ['user__room', 'player_style', style, 'player_id', player_id]);
    await dbQuery(format,db);

    return {success: true};
  },
};
