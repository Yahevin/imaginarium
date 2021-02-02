import { TResponseFunc } from '@my-app/types';
import { TLeaderBoard } from '@my-app/interfaces';
import { ROUTES } from '@my-app/constants';
import { User } from '../helpers/User';

const Party = require('../helpers/Party');

module.exports = (app: any, db: any) => {
  app.get(ROUTES.LEADER_BOARD, async (req: any, res: TResponseFunc<TLeaderBoard>) => {
    const { room_id } = req.body;

    try {
      const users_id_list = await Party.getUsersIdList(app, db, room_id);
      const users = await User.getList({ app, db, users_id_list });

      return res.json({
        success: true,
        users,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
