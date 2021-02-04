import { TQuery } from '@my-app/types';
import { DB_room, DB_user_room } from '@my-app/interfaces';
import { GAME_ACTION, T_GAME_ACTION } from '@my-app/constants';
import { isNotEmpty, dbQuery, sqlCommands as sql } from '../../utils';

const getRandomPartyName = require('../mixins/getRandomPartyName');

export const Party = {
  async create({ db }: TQuery<unknown>) {
    const created_at = new Date().getTime();
    const game_name = getRandomPartyName();
    const format = db.format(sql.ii4, [
      'room',
      'game_action',
      'game_name',
      'created_at',
      'player_count',
      GAME_ACTION.START,
      game_name,
      created_at,
      1,
    ]);
    const results: { insertId: number } = await dbQuery(format, db);

    return results.insertId;
  },
  async exist({ db, room_id }: TQuery<{ room_id: number }>): Promise<boolean> {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results: DB_room[] = await dbQuery(format, db);

    return isNotEmpty(results);
  },
  async addPlayer({
    db,
    user_id,
    room_id,
    game_master,
  }: TQuery<{ user_id: number; room_id: number; game_master: boolean }>) {
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
  async getUsersIdList({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results: DB_user_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.user_id;
      });
    }
    throw 'The getUsersIdList failed. There is no users in this room';
  },
  async getPlayersIdList({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results: DB_user_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.id;
      });
    }
    throw 'The getPlayersIdList failed. There is no users in this room';
  },
  async getPlayersList({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const results: DB_user_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getPlayersList failed. There is no users in this room';
  },
  async getActivePlayersList({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'is_active', true]);
    const results: DB_user_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'The getActivePlayersList failed. There is no users in this room';
  },
  async getActivePlayersIdList({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'is_active', true]);
    const results: DB_user_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.map((item) => {
        return item.id;
      });
    }
    throw 'The getActivePlayersIdList failed. There is no users in this room';
  },
  async setStatus({ db, room_id, game_action }: TQuery<{ room_id: number; game_action: T_GAME_ACTION }>) {
    const format = db.format(sql.usw, ['room', 'game_action', game_action, 'id', room_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async getPlayersCount({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'is_active', true]);
    const results: DB_user_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results.length;
    }
    throw 'All players are inactive';
  },
  async countUpdate({ db, room_id, new_count }: TQuery<{ room_id: number; new_count: number }>) {
    const format = db.format(sql.usw, ['room', 'player_count', new_count, 'id', room_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async includesUser({ db, user_id, room_id }: TQuery<{ user_id: number; room_id: number }>) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'user_id', user_id]);
    const results: DB_user_room[] = await dbQuery(format, db);

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
  async playerJoin({ db, player_id }: TQuery<{ player_id: number }>) {
    const format = db.format(sql.usw, ['user__room', 'is_active', true, 'id', player_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async playerLeave({ db, player_id }: TQuery<{ player_id: number }>) {
    const format = db.format(sql.usw, ['user__room', 'is_active', false, 'id', player_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async demoteGM({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.usww, ['user__room', 'game_master', false, 'game_master', true, 'room_id', room_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async getMyReincarnations({ db, user_id }: TQuery<{ user_id: number }>) {
    const format = db.format(sql.sfw, ['user__room', 'user_id', user_id]);
    const results: DB_user_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'User has`t recent games';
  },
  async getRoom({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfw, ['room', 'id', room_id]);
    const results: DB_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results[0];
    }
    throw 'This room not exist';
  },
  async getRoomsList({ db, room_id_list }: TQuery<{ room_id_list: number[] }>) {
    const format = db.format(sql.sfwi, ['room', 'id', room_id_list]);
    const results: DB_room[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'This room not exist';
  },
};
