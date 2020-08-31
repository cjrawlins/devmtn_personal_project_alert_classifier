import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import allReducers from './reducers/allReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
        allReducers,
        composeEnhancers(applyMiddleware(promiseMiddleware))
    );

export default store;