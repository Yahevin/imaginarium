import { TResponseFunc } from '@my-app/types';
import { DB_user_room } from '@my-app/interfaces';
import { ROUTES } from '@my-app/constants';
import { Player } from '../helpers/Player';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.USER_ROOM, async (req: any, res: TResponseFunc<DB_user_room>) => {
    const { room_id } = req.body;
    const { user_id } = req.body;

    try {
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
