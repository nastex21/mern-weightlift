import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
console.log("authen reducer");
console.log(user);
const initialState = user ? { loggedIn: true, id: '', user } : {};

export default function authentication(state = initialState, action) {
    console.log('action');
    console.log(action);
  
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state,
                loggingIn: true,
                user: action.user
            };
        case LOGIN_SUCCESS:
            return {...state,
                id: action.user,
                loggedIn: true,
            };
        case LOGIN_FAILURE:
            return {};
        case LOGOUT:
            return {};
        default:
            return state;
    }
}