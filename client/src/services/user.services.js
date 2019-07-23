import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    register,
    getAll
};

function getAll() {
    const requestOptions = {
        headers: authHeader()
    };

    return axios.get('/api/dashboard/', requestOptions).then((response) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return response;
    });
}

function login(username, password) {
    console.log("user.services");
    console.log(username);
    return axios.post('/api/login', { username: username, password: password })
        .then(user => {
            console.log(user.data.dataObj);
            var newObj = {};
            let eventsArr = [];
            user.data.dataObj.logs.map(function (item) {
              if (item.collections.length > 0) {
                eventsArr.push({
                  "title": "Weights",
                  "date": item.date,
                  "color": "#d9534f",
                  "collections": item.collections
                })
              }
            })
            user.data.dataObj.cardiologs.map(function (item) {
              if (item.collections.length > 0) {
                eventsArr.push({
                  "title": "Cardio",
                  "date": item.date,
                  'color': '#0275d8',
                  "collections": item.collections
                })
              }
            });
        
            user.data.dataObj.bwlogs.map(function (item) {
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
        
            user.data.dataObj.vidslogs.map(function (item) {
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
            newObj._id = user.data.dataObj._id;
            newObj.username = user.data.dataObj.username;
            localStorage.setItem('user', JSON.stringify(newObj));
            return newObj;
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