import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";

export default combineReducers({ currentUser }); // takes an object which has all key value pairs from other objects
