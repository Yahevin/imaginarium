import {IPerson} from "./IPerson";

export interface IPlayer extends IPerson{
    score: number
    game_master: boolean
}
