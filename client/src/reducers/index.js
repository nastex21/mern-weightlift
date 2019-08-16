import { combineReducers } from 'redux';
import modalToggle from './modalToggle';
import registration from './registrationReducer';
import dataModifier from './dataReducer';

export default combineReducers({
    modal: modalToggle,
    register: registration,
    dataModifier: dataModifier,
});