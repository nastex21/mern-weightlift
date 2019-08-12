import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

export const userService = {
  login,
  logout,
  register,
  getAll
};

function getAll(userID) {
  console.log("user.services is running");
  console.log(userID);
  var config = {
    params: userID,
    headers: authHeader()
  }
  return axios.get('/api/dashboard', config).then((response) => {
    console.log("getAll");
    console.log(response);
    return response;
  })
}

function login(username, password) {
  console.log("user.services");
  console.log(username);
  return axios.post('/api/login', { username: username, password: password }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(user => {
      console.log("user login: ");
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  console.log("logout 35");
  localStorage.removeItem('user');
}

function register(user) {
  console.log("user services");
  console.log(user);
  return axios.post("/api/signup/", { username: user.username, password: user.password }).then(response => {
    if (response.data.user) {
      return response.data.user;
    } else {
      console.log(response.data)
    }
  })
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}