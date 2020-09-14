import {SET_PARTY_ID, SET_PARTY_STATUS} from "@/store/actions";
import PartyState from "@/store/party/state";
import {PartyActionTypes} from "@/store/party/action";
import IPartyState from "@/store/party/IPartyState";


function partyReducer(state = PartyState, action: PartyActionTypes) : IPartyState {
    switch (action.type) {
        case SET_PARTY_ID: {
            return {
                ...state,
                room_id: action.payload
            }
        }
        case SET_PARTY_STATUS:
        default: {
            return {
                ...state,
                game_action: action.payload
            }
        }
    }
};

export default partyReducer;
