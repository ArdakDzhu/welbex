import {applyMiddleware, createStore} from "redux";
import reducers from "./Reducers/reducer";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(reducers, composeWithDevTools(applyMiddleware()));

export default store;