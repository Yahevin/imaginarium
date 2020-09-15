import IPartyState from "@/store/party/IPartyState";
import GAME_ACTION from "@/constants/GAME_ACTION";

const pageState: IPartyState = {
    room_id: null,
    players: [],
    game_master: false,
    game_action: GAME_ACTION.prepare,
};

export default pageState;
