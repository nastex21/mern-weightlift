import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,  TOGGLEERRORDISPLAY } from '../actions/types';

const initiialState = {
  registering: false,
  user: '',
  success: false,
  error: ''
}

export default function registration(state = initiialState, action) {
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
      return {...state,
        success: false,
        error: action.error
      };
    case TOGGLEERRORDISPLAY:
      return {...state,
      success: false
    }
    default:
      return state
  }
}