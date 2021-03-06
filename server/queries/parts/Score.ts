import { TQuery } from '@imaginarium/packages/types';
import { TScore } from '@imaginarium/packages/interfaces';
import { dbQuery, sqlCommands as sql } from '../../utils';

export const Score = {
  async updateLocal({ db, scores }: TQuery<{ scores: TScore[] }>) {
    const promises = scores.map((item) => {
      const format = db.format(sql.usw, ['user__room', 'score', item.score, 'id', item.player_id]);

      return dbQuery(format, db);
    });

    await Promise.all(promises);

    return { success: true };
  },
};
