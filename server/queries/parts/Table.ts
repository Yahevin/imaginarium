import { TQuery } from '@my-app/types';
import { DB_card } from '@my-app/interfaces';
import { CARD_STATUS } from '@my-app/constants';
import { isNotEmpty, dbQuery, sqlCommands as sql } from '../../utils';

export const Table = {
  async putCard({ db, card_id, is_main = false }: TQuery<{ card_id: number; is_main?: boolean }>) {
    const format = db.format(sql.ussw, ['card', 'status', CARD_STATUS.TABLE, 'is_main', is_main, 'id', card_id]);
    await dbQuery(format, db);

    return { success: true };
  },
  async getCard({ db, player_id }: TQuery<{ player_id: number }>) {
    const format = db.format(sql.sfww, ['card', 'player_id', player_id, 'status', CARD_STATUS.TABLE]);
    const results: DB_card[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results[0];
    }
    throw 'There is no user`s card on the table';
  },
  async alreadyPut({ db, player_id }: TQuery<{ player_id: number }>) {
    const format = db.format(sql.sfww, ['card', 'player_id', player_id, 'status', CARD_STATUS.TABLE]);
    const results: DB_card[] = await dbQuery(format, db);

    return isNotEmpty(results);
  },
  async getCardsList({ db, basket_id }: TQuery<{ basket_id: number }>) {
    const format = db.format(sql.sfww, ['card', 'basket_id', basket_id, 'status', CARD_STATUS.TABLE]);
    const results: DB_card[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'There is no such cards on the table';
  },
  async getPlayersCards({ db, players_id_list }: TQuery<{ players_id_list: number[] }>) {
    const format = db.format(sql.sfwwi, ['card', 'status', CARD_STATUS.TABLE, 'player_id', players_id_list]);
    const results: DB_card[] = await dbQuery(format, db);

    if (isNotEmpty(results)) {
      return results;
    }
    throw 'There is no such cards on the table';
  },
};
