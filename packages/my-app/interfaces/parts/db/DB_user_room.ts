export interface DB_user_room {
    id: number,
    user_id: number,
    room_id: number,
    is_active: boolean,
    game_master: boolean,
    score: number,
}
