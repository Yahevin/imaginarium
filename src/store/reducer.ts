import InferReducerType from "@/types/InferReducerType";
import {combineReducers} from "redux";
import pageReducer from "@/store/page/reducer";
import userReducer from "@/store/user/reducer";

const reducers = {
    pageReducer,
    userReducer,
};

const reducer = combineReducers(reducers);

type TStore = InferReducerType<typeof reducers>

export {reducer, TStore};
