import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, 
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, 
  GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS,
  TOGGLEERRORDISPLAY } from './types';
import { userService } from '../services/user.services';
import { history } from '../helpers/history';

export const userActions = {
  login,
  logout,
  register,
  getAll
};

/*REGISTER DISPATCH */
function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(user => {
        if (user == "Sorry, username is already taken."){
          var msg = "Sorry, username is already taken.";
          dispatch(failure(msg));
        } else {
          dispatch(success(user));
          history.push('/api/login');
        }
      })
      .catch(error => {
        dispatch(failure(error.toString()))
      })
  };

  function request(user) { return { type: REGISTER_REQUEST, user } }
  function success(user) { return { type: REGISTER_SUCCESS, user } }
  function failure(error) { return { type: REGISTER_FAILURE, error } }
};


/*LOGIN DISPATCH */
function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(user => {
        dispatch(success(user));
        history.push('/api/dashboard');
      })
      .catch(error => {
        dispatch(failure(error.toString()));
      })
  }

  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

/* LOGOUT DISPATCH */
function logout() {
  userService.logout();
  return { type: LOGOUT };
}

/*GRAB DATA DISPATCH */
function getAll(data) {
  return dispatch => {
    dispatch(request());
    userService.getAll(data)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: GETALL_REQUEST } }
  function success(users) { return { type: GETALL_SUCCESS, users } }
  function failure(error) { return { type: GETALL_FAILURE, error } }
}

export const toggleRegistration = () => dispatch => {
  dispatch({
    type: TOGGLEERRORDISPLAY 
  })
}