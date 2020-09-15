import GAME_ACTION from "@/constants/GAME_ACTION";
import IPlayer from "@/interfaces/IPlayer";

interface IPartyState {
    room_id: number,
    players: IPlayer[],
    game_master: boolean,
    game_action: GAME_ACTION,
}

export default  IPartyState;
