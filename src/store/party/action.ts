import InferValueTypes from "@/types/InferValueTypes";
import {SET_PARTY_ID, SET_PARTY_STATUS} from "@/store/actions";
import GAME_ACTION from "@/constants/GAME_ACTION";

const PartyAction = {
    setId: function(room_id: number) {
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
    }
};

type PartyActionTypes = ReturnType<InferValueTypes<typeof PartyAction>>;


export {PartyAction, PartyActionTypes};

