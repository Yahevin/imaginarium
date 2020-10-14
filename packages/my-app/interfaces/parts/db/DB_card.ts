import {DB_basket, DB_shelter, DB_user_room} from "@my-app/interfaces";
import {CARD_STATUS} from "@my-app/constants";

export interface DB_card {
    id: number,
    img_url: string,
    origin_id: DB_shelter['id'],
    player_id: DB_user_room['id'],
    basket_id: DB_basket['id'],
    status: CARD_STATUS,
    is_main: boolean
}
