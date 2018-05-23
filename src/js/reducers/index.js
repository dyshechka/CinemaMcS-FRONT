import {combineReducers} from "redux";
import authorization from "./authorization";
import authError from "./authError";
import account from "./account";
import films from "./films";
import order from "./order";
import hall from "./hall";
import seance from "./seance";
import userProfile from "./userProfile";
import schedule from "./schedule";
import vacancy from "./vacancy";

export default combineReducers({
    authorization,
    authError,
    account,
    films,
    order,
    hall,
    seance,
    userProfile,
    schedule,
    vacancy,
});