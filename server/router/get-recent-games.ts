import {ROUTES} from "@my-app/constants";
import {DB_room, DB_user, DB_user_room, IGameAbout, IPlayer} from "@my-app/interfaces";
import {TResponseFunc} from "@my-app/types/parts/TResponse";
import User = require("server/helpers/User");

const Party = require('../helpers/Party');

type TGetRecent = { games: IGameAbout[] }

module.exports = function (app: any, db: any) {
    app.post(ROUTES.GET_RECENT_GAMES, async (req: any, res: TResponseFunc<TGetRecent>) => {
        try {
            const user_id = req.body.user_id;

            const self_player_list: DB_user_room[] = await Party.getMyReincarnations(app, db, user_id);
            const visited_room_id_list = self_player_list.map((user_room) => user_room.room_id);
            const visited_room_list: DB_room[] = await Party.getRoomsList(app, db, visited_room_id_list);

            const promises: Promise<any>[] = [];

            visited_room_list.forEach((room) => {
                promises.push(
                    getRoomData(room)
                )
            });

            const games: IGameAbout[] = await Promise.all(promises);

            return res.json({
                success: true,
                games
            })
        } catch (error) {
            return res.json({
                success: false,
                error: error,
            });
        }
    });
};

const getRoomData = async (room: DB_room): Promise<IGameAbout> => {
    const players_list: DB_user_room[] = await Party.getPlayersList(app, db, room.id);
    const users_id_list = players_list.map((item) => item.user_id);
    const users_list: DB_user[] = await User.getList(app, db, users_id_list);

    const full_players_list: IPlayer[] = users_list.map((user) => {
        const full_player = {
            nick_name: user.nick_name,
            experience: user.experience,
            score: 0,
            game_master: false
        };
        players_list.forEach((player) => {
            if (player.id === user.id) {
                full_player.score = player.score;
                full_player.game_master = player.game_master
            }
        });

        return full_player;
    });

    return {
        created_at: room.created_at,
        game_name: room.game_name,
        players: full_players_list
    }
};
