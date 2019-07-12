import { combineReducers } from 'redux';
import ModalReducer from './modal';

const rootReducer = combineReducers({
    modal: ModalReducer
});

export default rootReducer;