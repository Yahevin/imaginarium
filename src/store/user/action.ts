import InferValueTypes from "@/helpers/InferValueTypes";
import {SET_USER_ID} from "@/store/actions";
import {SET_USER_SCORE} from "@/store/actions";


const UserAction = {
    setUserId: function(id: number) {
        return {
            type: SET_USER_ID,
            payload: id,
        }
    },
    setUserScore: function (score: number) {
        return {
            type: SET_USER_SCORE,
            payload: score,
        }
    }
};

type UserActionTypes = ReturnType<InferValueTypes<typeof UserAction>>;


export {UserAction, UserActionTypes};

