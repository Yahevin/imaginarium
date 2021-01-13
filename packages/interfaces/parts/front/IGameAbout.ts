import {IPlayer} from "@my-app/interfaces";

export interface IGameAbout {
    id: number,
    created_at: number,
    game_name: string,
    players: IPlayer[]
}
