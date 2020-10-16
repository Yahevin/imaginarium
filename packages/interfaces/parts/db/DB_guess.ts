import {DB_basket, DB_card, DB_user_room} from "@my-app/interfaces";

export interface DB_guess {
    id: number,
    card_id: DB_card['id'],
    player_id: DB_user_room['id'],
    basket_id: DB_basket['id'],
}
