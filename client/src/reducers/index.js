import { combineReducers } from 'redux';
import modalToggle from './modalToggle';
import dataReducer from './dataReducer';
import authentication from './authenticationReducer';
import registration from './registrationReducer';

export default combineReducers({
    modal: modalToggle,
    data: dataReducer,
    authenticate: authentication,
    register: registration
});