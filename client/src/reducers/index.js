import { combineReducers } from 'redux';
import modalToggle from './modalToggle';
import authentication from './authenticationReducer';
import registration from './registrationReducer';
import dataModifier from './dataReducer';
import eventReducer from './calendarevents';

export default combineReducers({
    modal: modalToggle,
    authenticate: authentication,
    register: registration,
    dataModifier: dataModifier,
    eventReducer: eventReducer
});