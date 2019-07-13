import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions/types';

export default function registration(state = {}, action) {
  console.log("action");
    console.log(action);
  switch (action.type) {
    case REGISTER_REQUEST:
        return {
          registering: true,
          user: action.user
      };
    case REGISTER_SUCCESS:
      return { 
        success: true
    };
    case REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}