import { TResponseFunc, TRequest } from '@imaginarium/packages/types';
import { TGetPlayer } from '@imaginarium/packages/interfaces';
import { ROUTES } from '@imaginarium/packages/constants';
import { Player } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_PLAYER, async (req: TRequest<TGetPlayer>, res: TResponseFunc<TGetPlayer>) => {
    try {
      const { user_id } = authToken(req);
      const { room_id } = req.body;
      const player = await Player.get({ app, db, user_id, room_id, by: 'room' });

      return res.json({
        success: true,
        ...player,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
