import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
console.log("authen reducer");
console.log(user);
const initialState = user ? { loggedIn: true, user } : {};

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
                loggedIn: true,
                user: action.user
            };
        case LOGIN_FAILURE:
            return {};
        case LOGOUT:
            return {};
        default:
            return state;
    }
}