import { InferReducerType } from '@my-app/types';
import { combineReducers } from 'redux';
import userReducer from '@/store/user/reducer';
import partyReducer from '@/store/party/reducer';
import cardsReducer from '@/store/cards/reducer';

const reducers = {
  userReducer,
  partyReducer,
  cardsReducer,
};

const reducer = combineReducers(reducers);

type TReducers = typeof reducers;
type TStore = InferReducerType<TReducers>;

export { reducer, TStore };
