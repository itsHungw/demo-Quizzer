import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
});

export default rootReducer;