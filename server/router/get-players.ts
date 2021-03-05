import { ROUTES } from '@imaginarium/packages/constants';
import { TResponseFunc, TRequest } from '@imaginarium/packages/types';
import { TGetPlayers } from '@imaginarium/packages/interfaces';
import { Party, User } from '../queries';
import { authToken } from '../utils';
import { RoomControllersPull } from '../types';

module.exports = (app: any, db: any, roomsMap: RoomControllersPull) => {
  app.post(ROUTES.GET_PLAYERS, async (req: TRequest<TGetPlayers>, res: TResponseFunc<TGetPlayers>) => {
    try {
      authToken(req);
      const { room_id } = req.body;

      const { playersList } = await Party.getPlayersList({
        app,
        db,
        room_id,
        roomsMap,
      });
      const users_list = await User.getList({ app, db, room_id });

      const party = playersList.map((player) => {
        const userIndex = users_list.findIndex((user) => {
          return user.id === player.user_id;
        });
        if (userIndex < 0) {
          throw { desc: 'One in users not found' };
        }
        const user = users_list[userIndex];

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
