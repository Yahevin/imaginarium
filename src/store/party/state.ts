import IPartyState from "@/store/party/IPartyState";

const pageState: IPartyState = {
    room_id: null,
    players: [],
    question: '',
    game_master: false,
    game_action: null,
};

export default pageState;
