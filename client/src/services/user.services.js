import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

export const userService = {
  login,
  logout,
  register,
  getAll,
  saveChanges
};

let user = JSON.parse(localStorage.getItem('user'));

var header;
if (user) {
  header = 'Bearer ' + user.data.token
}

function saveChanges(id, date, color, collection) {
  console.log("saveChanges");
  console.log(id)
  return axios.post('/api/edit-items', { id, date, color, collection })
    .then((response) => {
      console.log(response);
      return response
    })
    .catch(error => {
      console.log(error);
    });
}

function getAll(userID) {

  return axios({
    method: 'get',
    url: '/api/dashboard',
    params: {
      id: userID,
    }
  }).then(response => {
    return response;
  }).catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}


function login(username, password) {
  return axios.post('/api/login', { username: username, password: password }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function register(user) {
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