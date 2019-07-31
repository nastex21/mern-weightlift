import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions/types';

export default function registration(state = {}, action) {
  console.log("action");
    console.log(action);
  switch (action.type) {
    case REGISTER_REQUEST:
        return {...state,
          registering: true,
          user: action.user
      };
    case REGISTER_SUCCESS:
      return { ...state,
        success: true
    };
    case REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}