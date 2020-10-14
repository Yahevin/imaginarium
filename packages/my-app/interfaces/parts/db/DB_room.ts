import {GAME_ACTION} from "@my-app/constants";

export interface DB_room {
    id: number,
    player_count: number,
    game_action: GAME_ACTION
}
