import {SET_USER_ID} from "@/store/actions";
import {SET_USER_SCORE} from "@/store/actions";
import userState from "@/store/user/state";
import {UserActionTypes} from "@/store/user/action";
import IUserState from "@/store/user/IUserState";

function userReducer(state = userState, action: UserActionTypes) : IUserState {
    switch (action.type) {
        case SET_USER_ID: {
            return {
                ...state,
                user_id: action.payload
            }
        }
        case SET_USER_SCORE: {
            return {
                ...state,
                score: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;
