import {SET_USER_ID, SET_USER_EXP, SET_USER} from "@/store/actions";
import userState from "@/store/user/state";
import {UserActionTypes} from "@/store/user/action";
import IUserState from "@/store/user/IUserState";

function userReducer(state = userState, action: UserActionTypes) : IUserState {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                experience: action.payload.experience,
                user_id: action.payload.user_id,
                nick_name: action.payload.nick_name,
            }
        }
        case SET_USER_ID: {
            return {
                ...state,
                user_id: action.payload
            }
        }
        case SET_USER_EXP: {
            return {
                ...state,
                experience: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
