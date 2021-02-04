import { TResponseFunc } from '@my-app/types';
import { TUserJoin } from '@my-app/interfaces';
import { ROUTES } from '@my-app/constants';
import { Player } from '../helpers/Player';
import { Party } from '../helpers/Party';
import { authToken } from '../utils/authToken';

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
          await Party.playerJoin({ app, db, player_id });
          const player = await Player.get({ app, db, player_id, by: 'id' });
          game_master = player.game_master;
        } else {
          await Party.addPlayer({ app, db, user_id, room_id, game_master: false });
        }

        const { game_action } = await Party.getRoom({ app, db, room_id });
        const new_count = await Party.getPlayersCount({ app, db, room_id });
        await Party.countUpdate({ app, db, room_id, new_count });

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
