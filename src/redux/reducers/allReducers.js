import { combineReducers } from 'redux';

// Reducers
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import settingsReducer from './settingsReducer';

const allReducers = combineReducers( {
    reduxUser: userReducer,
    reduxEvents: eventsReducer,
    reduxSettings: settingsReducer
} );

export default allReducers;