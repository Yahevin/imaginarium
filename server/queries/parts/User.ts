import { DB_user } from '@my-app/interfaces';
import { TQuery } from '@my-app/types';
import { isNotEmpty, dbQuery, sqlCommands as sql } from '../../utils';

export const User = {
  async create({ db, nick_name, password }: TQuery<{ nick_name: string; password: string }>) {
    const format = db.format(sql.ii3, ['user', 'nick_name', 'password', 'experience', nick_name, password, 0]);
    const { insertId } = await dbQuery(format, db);

    return insertId as number;
  },
  async get({
    db,
    ...props
  }: TQuery<{ nick_name: string; password: string; by: 'password' } | { user_id: number; by: 'id' }>) {
    const format =
      props.by === 'id'
        ? db.format(sql.sfw, ['user', 'id', props.user_id])
        : db.format(sql.sfww, ['user', 'nick_name', props.nick_name, 'password', props.password]);
    const results: DB_user[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results[0];
    }
    throw 'Such user not found';
  },

  async getList({ db, users_id_list }: TQuery<{ users_id_list: number[] }>) {
    const format = db.format(sql.sfwi, ['user', 'id', users_id_list]);
    const result: DB_user[] = await dbQuery(format, db);

    if (isNotEmpty(result)) {
      return result;
    }
    throw 'Users not found';
  },
};
