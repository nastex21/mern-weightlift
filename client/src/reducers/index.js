import { combineReducers } from 'redux';
import modalToggle from './modalToggle';
import authentication from './authenticationReducer';
import registration from './registrationReducer';
import dataModifier from './dataReducer';

export default combineReducers({
    modal: modalToggle,
    authenticate: authentication,
    register: registration,
    dataModifier: dataModifier
});