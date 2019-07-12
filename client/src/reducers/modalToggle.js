import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
    modalIsOpen: false
  };
  
  export default function modalToggle(state = initialState, action) {
    switch(action.type) {
      case OPEN_MODAL:
        return {
          ...state,
          modalIsOpen: true,
        };
      case CLOSE_MODAL:
        return {
          ...state,
          modalIsOpen: false,
        };
      default:
        return state;
    }
  }