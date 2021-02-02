/* eslint-disable no-prototype-builtins */
import { DB_user_room } from '@my-app/interfaces';
import { TQuery } from '@my-app/types';

const sql = require('../mixins/sqlCommands');
const dbQuery = require('../mixins/dbQuery');
const isNotEmpty = require('../mixins/isNotEmpty');

export const Player = {
  async get(props: TQuery<{ by: 'room'; user_id: number; room_id: number } | { by: 'id'; player_id: number }>) {
    const format =
      props.by === 'id'
        ? props.db.format(sql.sfw, ['user__room', 'id', props?.player_id])
        : props.db.format(sql.sfww, ['user__room', 'room_id', props?.room_id, 'user_id', props?.user_id]);
    const results: DB_user_room[] = await dbQuery(format, props.db);

    if (isNotEmpty(results)) {
      return results[0];
    }
    throw 'Player not found';
  },
  async findGM({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfww, ['user__room', 'room_id', room_id, 'game_master', true]);
    const results = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results[0].id;
    }
    throw 'The findGM failed. Did not found such user';
  },
  async demoteGM({ db, player_id }: TQuery<{ player_id: number }>) {
    const format = db.format(sql.usw, ['user__room', 'game_master', false, 'id', player_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async setGM({ db, player_id }: TQuery<{ player_id: number }>) {
    const format = db.format(sql.usw, ['user__room', 'game_master', true, 'id', player_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async setStyle({ db, style, player_id }: TQuery<{ style: string; player_id: number }>) {
    const format = db.format(sql.usw, ['user__room', 'player_style', style, 'player_id', player_id]);
    await dbQuery(format, db);

    return { success: true };
  },
};
