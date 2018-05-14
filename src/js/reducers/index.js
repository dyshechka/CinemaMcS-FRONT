import {combineReducers} from "redux";
import authorization from "./authorization";
import authError from "./authError";
import account from "./account";
import films from "./films";

export default combineReducers({
    authorization,
    authError,
    account,
    films
});