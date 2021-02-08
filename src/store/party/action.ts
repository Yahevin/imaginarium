import { InferValueTypes } from '@my-app/types';
import { LEAVE_PARTY, SET_GAME_ROLE, SET_PARTY_ID, SET_PARTY_STATUS, SET_PLAYERS, SET_QUESTION } from '@/store/actions';
import { T_GAME_ACTION } from '@my-app/constants';
import { IPlayer } from '@my-app/interfaces';

const PartyAction = {
  setPartyId(room_id: number | null) {
    return {
      type: SET_PARTY_ID,
      payload: room_id,
    };
  },
  setGAction(game_action: T_GAME_ACTION) {
    return {
      type: SET_PARTY_STATUS,
      payload: game_action,
    };
  },
  setPlayers(players: IPlayer[]) {
    return {
      type: SET_PLAYERS,
      payload: players,
    };
  },
  setGameRole(game_master: boolean) {
    return {
      type: SET_GAME_ROLE,
      payload: game_master,
    };
  },
  setQuestion(question: string) {
    return {
      type: SET_QUESTION,
      payload: question,
    };
  },
  leave() {
    return {
      type: LEAVE_PARTY,
    };
  },
};

type PartyActionTypes = ReturnType<InferValueTypes<typeof PartyAction>>;

export { PartyAction, PartyActionTypes };
