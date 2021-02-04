import { TQuery } from '@my-app/types';
import { DB_basket } from '@my-app/interfaces';
import { isNotEmpty, dbQuery, sqlCommands as sql } from '../../utils';

export const Basket = {
  async get({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.sfw, ['basket', 'room_id', room_id]);
    const results: DB_basket[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return { basket_id: results[0].id };
    }
    throw 'Basket does`t exist';
  },
  async clear({ db, basket_id }: TQuery<{ basket_id: number }>) {
    const format = db.format(sql.dfw, ['basket', 'id', basket_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async create({ db, room_id }: TQuery<{ room_id: number }>) {
    const format = db.format(sql.ii1, ['basket', 'room_id', room_id]);
    const result: { insertId: number } = await dbQuery(format, db);

    return { basket_id: result.insertId };
  },
};
