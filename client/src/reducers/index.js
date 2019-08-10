import { combineReducers } from 'redux';
import modalToggle from './modalToggle';
import registration from './registrationReducer';
import dataModifier from './dataReducer';
import eventReducer from './calendarevents';

export default combineReducers({
    modal: modalToggle,
    register: registration,
    dataModifier: dataModifier,
    eventReducer: eventReducer
});