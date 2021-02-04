import { TResponseFunc, TRequest } from '@my-app/types';
import { TGetPlayer } from '@my-app/interfaces';
import { ROUTES } from '@my-app/constants';
import { Player } from '../helpers/Player';
import { authToken } from '../utils/authToken';

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
