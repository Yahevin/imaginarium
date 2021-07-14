import { TQuery } from '@imaginarium/packages/types';
import { DB_room, DB_user_room } from '@imaginarium/packages/interfaces';
import { ERROR, GAME_ACTION, T_GAME_ACTION } from '@imaginarium/packages/constants';
import { isNotEmpty, dbQuery, sqlCommands as sql, getRandomPartyName, findActivePlayers } from '../../utils';
import { RoomControllersPull } from '../../types';

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
      'score',
      room_id,
      user_id,
      game_master,
      0,
    ]);
    await dbQuery(format, db);

    return { success: true };
  },
  async getPlayers({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfw, ['user__room', 'room_id', room_id]);
    const playersList: DB_user_room[] = await dbQuery(format, db);
    const playersIdList = playersList.map((item) => item.id);

    return {
      playersList,
      playersIdList,
    };
  },
  async getActivePlayers({ db, room_id, roomsMap }: TQuery<{ room_id: number; roomsMap: RoomControllersPull }>) {
    const currentParty = roomsMap.get(room_id);
    if (!currentParty) {
      throw ERROR.ROOM_ID_INCORRECT;
    }

    const { playersList } = await this.getPlayers({ db, room_id });

    if (isNotEmpty(playersList)) {
      const activePlayersIdList = currentParty.players.map((item) => item.controller.player_id);
      const activePlayersList = findActivePlayers({ playersList, activePlayersIdList });

      return {
        activePlayersList,
        activePlayersIdList,
      };
    }
    throw 'The getPlayersList failed. There is no users in this room';
  },
  async setStatus({ db, room_id, game_action }: TQuery<{ room_id: number; game_action: T_GAME_ACTION }>) {
    const format = db.format(sql.usw, ['room', 'game_action', game_action, 'id', room_id]);
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
