import {InferValueTypes} from "@my-app/types";
import {SET_USER} from "@/store/actions";
import {SET_USER_ID} from "@/store/actions";
import {SET_USER_EXP} from "@/store/actions";
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
    setUserExperience: function (experience: number) {
        return {
            type: SET_USER_EXP,
            payload: experience,
        }
    }
};

type UserActionTypes = ReturnType<InferValueTypes<typeof UserAction>>;


export {UserAction, UserActionTypes};

