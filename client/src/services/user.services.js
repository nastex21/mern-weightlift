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
            return localStorage.setItem('user', JSON.stringify(user.data.dataObj));
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