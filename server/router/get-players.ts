import { ROUTES } from '@imaginarium/packages/constants';
import { TResponseFunc, TRequest } from '@imaginarium/packages/types';
import { TGetPlayers } from '@imaginarium/packages/interfaces';
import { Party, User } from '../queries';
import { authToken, findActivePlayers } from '../utils';
import { RoomControllersPull } from '../types';

module.exports = (app: any, db: any, rooms: RoomControllersPull) => {
  app.post(ROUTES.GET_PLAYERS, async (req: TRequest<TGetPlayers>, res: TResponseFunc<TGetPlayers>) => {
    try {
      authToken(req);
      const { room_id } = req.body;

      const currentParty = rooms.get(room_id);
      if (!currentParty) {
        return;
      }
      const players_list = await Party.getPlayersList({ app, db, room_id });
      const users_list = await User.getList({ app, db, room_id });

      const activePlayersIdList = currentParty.players.map((item) => item.controller.player_id);
      const activePlayersList = findActivePlayers({ players_list, activePlayersIdList });

      const party = activePlayersList.map((player) => {
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
