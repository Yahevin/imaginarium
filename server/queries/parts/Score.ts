import { TQuery } from '@my-app/types';
import { dbQuery, sqlCommands as sql } from '../../utils';

export const Score = {
  async updateLocal({ db, rewards }: TQuery<{ rewards: { score: number; player_id: number }[] }>) {
    const promises = rewards.map((reward) => {
      const format = db.format(sql.usw, ['user__room', 'score', reward.score, 'id', reward.player_id]);

      return dbQuery(format, db);
    });

    await Promise.all(promises);

    return { success: true };
  },
};
