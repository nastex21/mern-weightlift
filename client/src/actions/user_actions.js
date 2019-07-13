import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './types';
import { userService } from '../services/user.services';
import { history } from '../helpers/history';

export const userActions = {
  login,
  logout,
  register
  // getAll,
  // delete: _delete
};

/* export const fetchData = (data) => {
    return {
      type: FETCH_DATA,
      data
    }
  };
  
  export const fetchAllData = () => {
    return (dispatch) => {
      return axios.get('/api/dashboard/')
        .then(response => {
          dispatch(fetchData(response.data.user))
        })
        .catch(error => {
          throw(error);
        });
    };
  }; */

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(user => {
        dispatch(success(user));
        history.push('/api/dashboard');
      },
        error => {
          dispatch(failure(error.toString()));
          //dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: LOGOUT };
}

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
  }
    ;

  function request(user) { return { type: REGISTER_REQUEST, user } }
  function success(user) { return { type: REGISTER_SUCCESS, user } }
  function failure(error) { return { type: REGISTER_FAILURE, error } }
};