import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function store(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(thunkMiddleware)),
    );
}