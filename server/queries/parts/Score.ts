import { TQuery } from '@my-app/types';
import { TReward } from '@my-app/interfaces';
import { dbQuery, sqlCommands as sql } from '../../utils';

export const Score = {
  async updateLocal({ db, rewards }: TQuery<{ rewards: TReward[] }>) {
    const promises = rewards.map((reward) => {
      const format = db.format(sql.usw, ['user__room', 'score', reward.diff, 'id', reward.player_id]);

      return dbQuery(format, db);
    });

    await Promise.all(promises);

    return { success: true };
  },
};
