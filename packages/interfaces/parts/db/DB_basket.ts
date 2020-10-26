import {DB_room} from "@my-app/interfaces";

export interface DB_basket {
    id: number,
    room_id: DB_room['id']
}
