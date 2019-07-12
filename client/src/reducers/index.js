import { combineReducers } from 'redux';
import modalToggle from './modalToggle';
import dataReducer from './dataReducer';

export default combineReducers({
    modal: modalToggle,
    data: dataReducer
});