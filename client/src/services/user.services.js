import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    register,
    getAll
    /*getById,
    update,
    delete: _delete */
};


/* axios.post('/api/login', {
    username: this.state.username,
    password: this.state.password
}).then(response => {
    console.log('login response: ')
    if (response.status === 200) {

        // update App.js state
        this.props.updateUser({
            id: response.data._id,
            loggedIn: true,
            username: response.data.username,
            exerciseLogs: response.data.logs,
            cardioLogs: response.data.cardiologs,
            bwLogs: response.data.bwlogs,
            vidsLogs: response.data.vidslogs
        })

        // update the state to redirect to home
        this.setState({
            redirectTo: '/api/dashboard',
        })
    }
}).catch(error => {
    console.log('login error: ')
    console.log(error);
    this.setState({
        visible: true
    })
}) */

function getAll() {
    const requestOptions = {
        headers: authHeader()
    };

    return axios.get('/api/dashboard/').then((response) => {
        return response;
    });
}

function login(username, password) {

    return axios.post('/api/login', { username: username, password: password })
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user){
    console.log("user services");
    console.log(user);
    return axios.post("/api/dashboard/", { username: user.username, password: user.password}).then(response => {
        if (response.data.user){
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