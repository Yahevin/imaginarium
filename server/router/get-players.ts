import { ROUTES } from '@my-app/constants';
import { TResponseFunc, TRequest } from '@my-app/types';
import { DB_user, DB_user_room, TGetPlayers } from '@my-app/interfaces';
import { Party } from '../helpers/Party';
import { User } from '../helpers/User';
import { authToken } from '../utils/authToken';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_PLAYERS, async (req: TRequest<TGetPlayers>, res: TResponseFunc<TGetPlayers>) => {
    try {
      authToken(req);
      const { room_id } = req.body;

      const playersList: DB_user_room[] = await Party.getActivePlayersList({ app, db, room_id });
      const users_id_list: number[] = await Party.getUsersIdList({ app, db, room_id });
      const usersList = await User.getList({ app, db, users_id_list });

      const party = playersList.map((player) => {
        const userIndex = usersList.findIndex((user) => {
          return user.id === player.user_id;
        });
        if (userIndex < 0) {
          throw { desc: 'One in users not found' };
        }
        const user: DB_user = usersList[userIndex];

        return {
          id: player.id,
          score: player.score,
          nick_name: user.nick_name,
          experience: user.experience,
          game_master: player.game_master,
        };
      });

      return res.json({
        success: true,
        party,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });
};
