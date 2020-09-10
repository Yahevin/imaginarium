import {combineReducers} from "redux";
import pageReducer from "@/store/page/reducer";
import userReducer from "@/store/user/reducer";

const reducer = combineReducers({
    pageReducer,
    userReducer,
});

export default reducer;
