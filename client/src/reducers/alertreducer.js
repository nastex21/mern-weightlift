import { SUCCESS, ERROR, CLEAR } } from '../actions/types';

export function alert(state = {}, action) {
  console.log("action");
    console.log(action);
  switch (action.type) {
    case SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case CLEAR:
      return {};
    default:
      return state
  }
}