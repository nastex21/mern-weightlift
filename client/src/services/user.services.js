import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

export const userService = {
  login,
  logout,
  register,
  getAll,
  addItem,
  saveChanges
};

let user = JSON.parse(localStorage.getItem('user'));

var header;
if (user) {
  header = 'Bearer ' + user.data.token
}

function addItem(options) {

  var item = {
    id: options.id,
    collection: options.collection,
    date: options.date,
    flag: options.flag
  };

  const storedData = JSON.parse(localStorage.getItem('user'));

  var config = {
    headers: { 'Authorization': "bearer " + storedData.token }
  };

  return axios.post("/api/add-items", { id: item.id, collection: item.collection, date: item.date, flag: item.flag }, config)
    .then(data => {
      console.log("data");
      console.log(data);
      var newObj = {};
      let eventsArr = [];
      data.data.logs.map(function (item) {
        if (item.collections.length > 0) {
          eventsArr.push({
            "title": "Weights",
            "date": item.date,
            "color": "#d9534f",
            "collections": item.collections
          })
        }
      })
      data.data.cardiologs.map(function (item) {
        if (item.collections.length > 0) {
          eventsArr.push({
            "title": "Cardio",
            "date": item.date,
            'color': '#0275d8',
            "collections": item.collections
          })
        }
      });

      data.data.bwlogs.map(function (item) {
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

      data.data.vidslogs.map(function (item) {
        if (item.collections.length > 0) {
          eventsArr.push({
            "title": "Classes/Videos",
            "date": item.date,
            'color': '#f0ad4e',
            "collections": item.collections
          })
        }
      });
      newObj.events = eventsArr;
      newObj.logs = data.data.logs;
      newObj.cardiologs = data.data.cardiologs;
      newObj.bwlogs = data.data.bwlogs;
      newObj.vidslogs = data.data.vidslogs;
      console.log("newObj");
      console.log(newObj);
      return newObj;
    })
    .catch(error => {
      return error.toString();
    })

}

function saveChanges(dataObj) {
  console.log("saveChanges");
  console.log(dataObj);

  return axios.post('/api/edit-items', dataObj)
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
  return axios.post('/api/login', { username: username, password: password })
    .then(user => {
      console.log("success login user")
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    })
    .catch(error => {
      console.log("error login function");
      console.log(error);
      return error;
    })
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