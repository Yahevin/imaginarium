import {InferValueTypes} from "@my-app/types";
import {SET_GAME_ROLE, SET_PARTY_ID, SET_PARTY_STATUS, SET_PLAYERS, SET_QUESTION} from "@/store/actions";
import {GAME_ACTION} from "@my-app/constants";
import {IPlayer} from "@my-app/interfaces";

const PartyAction = {
    setPartyId: function(room_id: number) {
        return {
            type: SET_PARTY_ID,
            payload: room_id,
        }
    },
    setGAction: function (game_action: GAME_ACTION) {
        return {
            type: SET_PARTY_STATUS,
            payload: game_action,
        }
    },
    setPlayers: function (players: IPlayer[]) {
        return {
            type: SET_PLAYERS,
            payload: players
        }
    },
    setGameRole: function (game_master: boolean) {
        return {
            type: SET_GAME_ROLE,
            payload: game_master
        }
    },
    setQuestion: function (question: string) {
        return {
            type: SET_QUESTION,
            payload: question
        }
    }
};

type PartyActionTypes = ReturnType<InferValueTypes<typeof PartyAction>>;


export {PartyAction, PartyActionTypes};

