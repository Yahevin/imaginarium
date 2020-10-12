import {GAME_ACTION} from "@my-app/constants";
import {IPlayer} from "interfaces";

interface IPartyState {
    room_id: number,
    players: IPlayer[],
    question: string,
    game_master: boolean,
    game_action: GAME_ACTION,
}

export default  IPartyState;
