import {GAME_ACTION} from "@my-app/constants";
import {IPlayer} from "@my-app/interfaces";
import {InferValueTypes} from "@my-app/types";

interface IPartyState {
    room_id: number,
    players: IPlayer[],
    question: string,
    game_master: boolean,
    game_action: InferValueTypes<typeof GAME_ACTION>,
}

export default  IPartyState;
