import { combineReducers } from "redux";
import userReducer from "./user";
console.log(userReducer)
const allReducers = combineReducers({userReducer});

export default allReducers