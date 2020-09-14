import InferReducerType from "@/types/InferReducerType";
import {combineReducers} from "redux";
import pageReducer from "@/store/page/reducer";
import userReducer from "@/store/user/reducer";
import partyReducer from "@/store/party/reducer";

const reducers = {
    pageReducer,
    userReducer,
    partyReducer,
};

const reducer = combineReducers(reducers);

type TStore = InferReducerType<typeof reducers>

export {reducer, TStore};
