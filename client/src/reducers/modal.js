import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const initialState = {
    modalIsOpen: false
};

export default function modal(state = initialState, action) {
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