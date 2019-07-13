import { combineReducers } from 'redux';
import modalToggle from './modalToggle';
import dataReducer from './dataReducer';
import authentication from './authenticationReducer';

export default combineReducers({
    modal: modalToggle,
    data: dataReducer,
    authenticate: authentication
});