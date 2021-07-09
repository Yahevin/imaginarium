import { TResponseFunc } from '@imaginarium/packages/types';
import { TUserJoin } from '@imaginarium/packages/interfaces';
import { ROUTES } from '@imaginarium/packages/constants';
import { Player, Party } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.USER_JOIN, async (req: any, res: TResponseFunc<TUserJoin>) => {
    try {
      const { room_id } = req.body;
      const { user_id } = authToken(req);

      const roomExist = await Party.exist({ app, db, room_id });
      let game_master = false;

      if (roomExist) {
        const { user_exist, player_id } = await Party.includesUser({ app, db, user_id, room_id });

        if (user_exist && player_id !== null) {
          const player = await Player.get({ app, db, player_id, by: 'id' });
          game_master = player.game_master;
        } else {
          await Party.addPlayer({ app, db, user_id, room_id, game_master: false });
        }

        const { game_action } = await Party.getRoom({ app, db, room_id });

        return res.json({
          game_action,
          game_master,
          success: true,
        });
      }
      return res.json({
        success: false,
        error: 'Room do not exist',
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
