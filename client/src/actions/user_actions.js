import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';
import { userService } from '../services/user.services';

export const userActions = {
    login,
    logout
   // register,
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
            .then(
                user => { 
                    dispatch(success(user));
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