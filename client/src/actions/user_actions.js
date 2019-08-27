import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS, SETSUCCESSMSG } from './types';
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
  console.log('user_actions');
  console.log(user);
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(user => {
        console.log("then register")
        dispatch(success(user));
        history.push('/api/login');
      })
      .catch(error => {
        console.log("error register")
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
        console.log("login dispatch");
        console.log(user);
        dispatch(success(user));
        history.push('/api/dashboard');
      })
       .catch(error => {
          console.log("error");
          console.log(error);
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
  console.log("it's running")
  return dispatch => {
    dispatch(request());
    console.log("getAll data")
    console.log(data);
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

/*FILTER EVENTS */

export const setMsg = (msg) => dispatch => {
  dispatch({
    type: SETSUCCESSMSG,
    msg: msg
  })
}