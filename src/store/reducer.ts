import {InferReducerType} from "@my-app/types";
import {combineReducers} from "redux";
import pageReducer from "@/store/page/reducer";
import userReducer from "@/store/user/reducer";
import partyReducer from "@/store/party/reducer";
import cardsReducer from "@/store/cards/reducer";

const reducers = {
    pageReducer,
    userReducer,
    partyReducer,
    cardsReducer,
};

const reducer = combineReducers(reducers);

type TReducers = typeof reducers
type TStore = InferReducerType<TReducers>

export {reducer, TStore};
