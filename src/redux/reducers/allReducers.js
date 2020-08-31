import { combineReducers } from 'redux';

// Temp to learn
import counterReducer from './counter';
import loggedReducer from './isLogged';

// Reducers
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import settingsReducer from './settingsReducer';

const allReducers = combineReducers( {
    counter: counterReducer,
    isLogged: loggedReducer,
    user: userReducer,
    events: eventsReducer,
    settings: settingsReducer
} );

export default allReducers;