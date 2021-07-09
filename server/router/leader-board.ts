import { TResponseFunc, TRequest } from '@imaginarium/packages/types';
import { TLeaderBoard } from '@imaginarium/packages/interfaces';
import { ROUTES } from '@imaginarium/packages/constants';
import { User } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.get(ROUTES.LEADER_BOARD, async (req: TRequest<TLeaderBoard>, res: TResponseFunc<TLeaderBoard>) => {
    try {
      authToken(req);
      const { room_id } = req.body;
      const users = await User.getList({ app, db, room_id });

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
