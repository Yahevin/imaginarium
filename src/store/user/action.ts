import { InferValueTypes } from '@my-app/types';
import { SET_USER, SET_USER_ID, SET_USER_EXP } from '@/store/actions';

import IUserState from '@/store/user/IUserState';

const UserAction = {
  setUser(props: IUserState) {
    return {
      type: SET_USER,
      payload: props,
    };
  },
  setUserId(id: number | null) {
    return {
      type: SET_USER_ID,
      payload: id,
    };
  },
  setUserExperience(experience: number | null) {
    return {
      type: SET_USER_EXP,
      payload: experience,
    };
  },
};

type UserActionTypes = ReturnType<InferValueTypes<typeof UserAction>>;

export { UserAction, UserActionTypes };
