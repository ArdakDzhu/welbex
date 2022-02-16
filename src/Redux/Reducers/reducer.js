import {combineReducers} from "redux";
import {toDoReducer} from "./toDoReducer";

const reducers = combineReducers({
    toDoReducer: toDoReducer,
})

export default reducers;
