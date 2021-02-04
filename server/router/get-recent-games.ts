/* eslint-disable @typescript-eslint/no-use-before-define */
import { ROUTES } from '@my-app/constants';
import { DB_room, DB_user_room, IGameAbout, IPlayer } from '@my-app/interfaces';
import { TResponseFunc } from '@my-app/types/parts/TResponse';
import { TGetRecent } from '@my-app/interfaces/parts/routes/TGetRecent';
import { TRequest } from '@my-app/types';
import { User, Party } from '../queries';
import { authToken } from '../utils';

module.exports = (app: any, db: any) => {
  app.post(ROUTES.GET_RECENT_GAMES, async (req: TRequest<TGetRecent>, res: TResponseFunc<TGetRecent>) => {
    try {
      const { user_id } = authToken(req);

      const self_player_list: DB_user_room[] = await Party.getMyReincarnations({ app, db, user_id });
      const visited_room_id_list = self_player_list.map((user_room) => user_room.room_id);
      const visited_room_list: DB_room[] = await Party.getRoomsList({ app, db, room_id_list: visited_room_id_list });

      const games: IGameAbout[] = await Promise.all(
        visited_room_list.map(async (room) => {
          return await getRoomData(room);
        }),
      );

      return res.json({
        success: true,
        games,
      });
    } catch (error) {
      return res.json({
        success: false,
        error,
      });
    }
  });

  const getRoomData = async (room: DB_room): Promise<IGameAbout> => {
    const players_list: DB_user_room[] = await Party.getPlayersList({ app, db, room_id: room.id });
    const users_id_list = players_list.map((item) => item.user_id);
    const users_list = await User.getList({ app, db, users_id_list });

    const full_players_list: IPlayer[] = users_list.map((user) => {
      const current_player = players_list.filter((player) => {
        return player.user_id === user.id;
      });
      if (current_player.length !== 1) throw 'Failed to build players map';

      return {
        id: current_player[0].id,
        nick_name: user.nick_name,
        experience: user.experience,
        score: current_player[0].score,
        game_master: current_player[0].game_master,
      };
    });

    return {
      id: room.id,
      created_at: room.created_at,
      game_name: room.game_name,
      players: full_players_list,
    };
  };
};
