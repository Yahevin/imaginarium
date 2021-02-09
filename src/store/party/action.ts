import { InferValueTypes } from '@my-app/types';
import {
  LEAVE_PARTY,
  SET_GAME_ROLE,
  SET_PARTY_ID,
  SET_PARTY_STATUS,
  SET_PLAYERS,
  SET_QUESTION,
  SET_REWARDS,
  UPDATE_PLAYERS,
} from '@/store/actions';
import { T_GAME_ACTION } from '@my-app/constants';
import { IPlayer, TReward, TScore } from '@my-app/interfaces';

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
  updatePlayers(scores: TScore[]) {
    return {
      type: UPDATE_PLAYERS,
      payload: scores,
    };
  },
  setGameRole(game_master: boolean) {
    return {
      type: SET_GAME_ROLE,
      payload: game_master,
    };
  },
  setQuestion(question: string | null) {
    return {
      type: SET_QUESTION,
      payload: question,
    };
  },
  setRewards(rewards: TReward[]) {
    return {
      type: SET_REWARDS,
      payload: rewards,
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
