// Reducer is basically a function that takes in an action, which you evaluate the action and send down a certain state depending on what the action does

import { combineReducers } from "redux";
import songs from "./songs";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
    songs,
    errors,
    messages,
    auth,
});
