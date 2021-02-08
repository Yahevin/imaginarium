import { LEAVE_PARTY, SET_GAME_ROLE, SET_PARTY_ID, SET_PARTY_STATUS, SET_PLAYERS, SET_QUESTION } from '@/store/actions';
import PartyState from '@/store/party/state';
import { PartyActionTypes } from '@/store/party/action';
import IPartyState from '@/store/party/IPartyState';

function partyReducer(state = PartyState, action: PartyActionTypes): IPartyState {
  switch (action.type) {
    case SET_PARTY_ID: {
      return {
        ...state,
        room_id: action.payload,
      };
    }
    case SET_PARTY_STATUS: {
      return {
        ...state,
        game_action: action.payload,
      };
    }
    case SET_PLAYERS: {
      return {
        ...state,
        players: action.payload,
      };
    }
    case SET_GAME_ROLE: {
      return {
        ...state,
        game_master: action.payload,
      };
    }
    case SET_QUESTION: {
      return {
        ...state,
        question: action.payload,
      };
    }
    case LEAVE_PARTY: {
      return {
        room_id: null,
        players: [],
        question: null,
        game_master: false,
        game_action: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default partyReducer;
