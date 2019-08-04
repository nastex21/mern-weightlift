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
  const requestOptions = {
    headers: authHeader()
  };

  console.log(requestOptions);

  return axios.get(
    '/api/dashboard/',
    {
      params: { id: userID },
      headers: authHeader()
    }
  ).then((response) => {
    console.log("getAll");
    console.log(response);
    var newObj = {};
    let eventsArr = [];
    response.data.authorizedData.user.logs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Weights",
          "date": item.date,
          "color": "#d9534f",
          "collections": item.collections
        })
      }
    })
    response.data.authorizedData.user.cardiologs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Cardio",
          "date": item.date,
          'color': '#0275d8',
          "collections": item.collections
        })
      }
    });

    response.data.authorizedData.user.bwlogs.map(function (item) {
      console.log(item);
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Bodyweight",
          "date": item.date,
          'color': '#5cb85c',
          "collections": item.collections
        })
      }
    });

    response.data.authorizedData.user.vidslogs.map(function (item) {
      if (item.collections.length > 0) {
        eventsArr.push({
          "title": "Classes/Videos",
          "date": item.date,
          'color': '#f0ad4e',
          "collections": item.collections
        })
      }
    });
    newObj.logs = response.data.authorizedData.user.logs;
    newObj.cardiologs = response.data.authorizedData.user.cardiologs;
    newObj.bwlogs = response.data.authorizedData.user.bwlogs;
    newObj.vidslogs = response.data.authorizedData.user.vidslogs;
    newObj.username = response.data.authorizedData.user.username;
    newObj.id = response.data.authorizedData.user._id;
    newObj.events = eventsArr;
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    return newObj;
  });
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
      return user.data.id;
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