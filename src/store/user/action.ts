import InferValueTypes from "@/types/InferValueTypes";
import {SET_USER} from "@/store/actions";
import {SET_USER_ID} from "@/store/actions";
import {SET_USER_SCORE} from "@/store/actions";
import IUserState from "@/store/user/IUserState";


const UserAction = {
    setUser: function(props:IUserState) {
        return {
            type: SET_USER,
            payload: props,
        }
    },
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

