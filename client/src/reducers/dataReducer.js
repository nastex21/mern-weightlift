import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS,
    ADDITEM_REQUEST, ADDITEM_FAILURE, ADDITEM_SUCCESS, SAVECHANGES_FAILURE, SAVECHANGES_REQUEST, SAVECHANGES_SUCCESS,
    UPDATESTATE, SETDATE, UPDATEEVENT, FILTEREVENTS, SETMSG
} from '../actions/types';

var user = JSON.parse(localStorage.getItem('user'));
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const initialState = user ? {
    color: '',
    loggingIn: '',
    loggedIn: true,
    date: '',
    dateShortened: '',
    dateText: '',
    events: [],
    eventsFiltered: [],
    id: '',
    username: '',
    weightLogs: [],
    cardioLogs: [],
    bwLogs: [],
    vidsLogs: [],
    msg: '',
    successMsg: '',
    loaded: 'false'
} : {};

export default function dataReducer(state = initialState, action) {
    console.log("action");
    console.log(action);
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };
        case LOGIN_SUCCESS:
            var eventsArr = [];
            action.user.data.data.logs.map(function (item) {
                eventsArr.push({
                    "title": "Weights",
                    "date": item.date,
                    "color": "#d9534f",
                    "collections": item.collections
                })
            })
            action.user.data.data.cardiologs.map(function (item) {
                eventsArr.push({
                    "title": "Cardio",
                    "date": item.date,
                    'color': '#0275d8',
                    "collections": item.collections
                })
            });

            action.user.data.data.bwlogs.map(function (item) {
                eventsArr.push({
                    "title": "Bodyweight",
                    "date": item.date,
                    'color': '#5cb85c',
                    "collections": item.collections
                })
            });

            action.user.data.data.vidslogs.map(function (item) {
                eventsArr.push({
                    "title": "Classes/Videos",
                    "date": item.date,
                    'color': '#f0ad4e',
                    "collections": item.collections
                })
            });
            return {
                ...state,
                id: action.user.data.data.id,
                weightLogs: [...action.user.data.data.logs],
                cardioLogs: [...action.user.data.data.cardiologs],
                bwLogs: [...action.user.data.data.bwlogs],
                vidsLogs: [...action.user.data.data.vidslogs],
                events: [...eventsArr],
                loggedIn: true,
            };
        case LOGIN_FAILURE:
            return {};
        case LOGOUT:
            return {};
        case GETALL_REQUEST:
            return { ...state, msg: 'loading' }
        case GETALL_SUCCESS:
            var eventsArr = [];
            action.users.data.logs.map(function (item) {
                eventsArr.push({
                    "title": "Weights",
                    "date": item.date,
                    "color": "#d9534f",
                    "collections": item.collections
                })
            })
            action.users.data.cardiologs.map(function (item) {
                eventsArr.push({
                    "title": "Cardio",
                    "date": item.date,
                    'color': '#0275d8',
                    "collections": item.collections
                })
            });

            action.users.data.bwlogs.map(function (item) {
                eventsArr.push({
                    "title": "Bodyweight",
                    "date": item.date,
                    'color': '#5cb85c',
                    "collections": item.collections
                })
            });

            action.users.data.vidslogs.map(function (item) {
                eventsArr.push({
                    "title": "Classes/Videos",
                    "date": item.date,
                    'color': '#f0ad4e',
                    "collections": item.collections
                })
            });
            return {
                ...state,
                username: action.users.data.username,
                id: action.users.data._id,
                weightLogs: [...action.users.data.logs],
                cardioLogs: [...action.users.data.cardiologs],
                bwLogs: [...action.users.data.bwlogs],
                vidsLogs: [...action.users.data.vidslogs],
                events: [...eventsArr],
                loaded: 'false',
                loggedIn: true
            }
        case GETALL_FAILURE:
            return { ...state, msg: "Failed to get" };
        case ADDITEM_REQUEST:
            return { ...state, msg: "loading" };
        case ADDITEM_SUCCESS:
            return {
                ...state,
                weightLogs: [...action.users.logs],
                cardioLogs: [...action.users.cardiologs],
                bwLogs: [...action.users.bwlogs],
                vidsLogs: [...action.users.vidslogs],
                events: [...action.users.events],
                loaded: 'true'
            }
        case ADDITEM_FAILURE:
            return state.msg = 'Item addition failed';
        case SAVECHANGES_REQUEST:
            return { ...state, msg: "loading" };
        case SAVECHANGES_SUCCESS:
                var eventsArr = [];
                action.users.data.logs.map(function (item) {
                    eventsArr.push({
                        "title": "Weights",
                        "date": item.date,
                        "color": "#d9534f",
                        "collections": item.collections
                    })
                })
                action.users.data.cardiologs.map(function (item) {
                    eventsArr.push({
                        "title": "Cardio",
                        "date": item.date,
                        'color': '#0275d8',
                        "collections": item.collections
                    })
                });
    
                action.users.data.bwlogs.map(function (item) {
                    eventsArr.push({
                        "title": "Bodyweight",
                        "date": item.date,
                        'color': '#5cb85c',
                        "collections": item.collections
                    })
                });
    
                action.users.data.vidslogs.map(function (item) {
                    eventsArr.push({
                        "title": "Classes/Videos",
                        "date": item.date,
                        'color': '#f0ad4e',
                        "collections": item.collections
                    })
                });
            return {
                ...state,
                successMsg: 'true',
                id: action.users.data._id,
                username: action.users.data.username,
                weightLogs: [...action.users.data.logs],
                cardioLogs: [...action.users.data.cardiologs],
                bwLogs: [...action.users.data.bwlogs],
                vidsLogs: [...action.users.data.vidslogs],
                events: [...eventsArr],
                loaded: 'false',
                loggedIn: true

            }
        case SAVECHANGES_FAILURE:
            return state.successMsg = 'false'
        case UPDATESTATE:
            return {
                ...state,
                msg: 'Success',
                id: action.data._id,
                username: action.data.username,
                weightLogs: [...action.data.logs],
                cardioLogs: [...action.data.cardiologs],
                bwLogs: [...action.data.bwlogs],
                vidsLogs: [...action.data.vidslogs],
                events: [...action.data.events]
            };
        case SETDATE:
            return {
                ...state,
                date: action.date,
                dateShortened: action.dateShort,
                dateText: action.date.toLocaleString('en-US', options)
            };
        case UPDATEEVENT:
            return {
                ...state,
                events: action.data.map((item) => item)
            }
        case FILTEREVENTS:
            var newCollection;
            //weights
            if (action.color == "#d9534f") {
                newCollection = state.weightLogs.filter(item => {
                    return item.date === action.hyphenDate
                })
            }
            //cardio 
            if (action.color == '#0275d8') {
                newCollection = state.cardioLogs.filter(item => {
                    return item.date === action.hyphenDate
                })
            }
            //bodyweight
            if (action.color == '#5cb85c') {
                newCollection = state.bwLogs.filter(item => {
                    return item.date === action.hyphenDate
                })
            }
            //videos -or- classes
            if (action.color == '#f0ad4e') {
                newCollection = state.vidsLogs.filter(item => {
                    return item.date === action.hyphenDate
                })
            }
            return {
                ...state,
                dateText: action.dateVal.toLocaleString('en-US', options),
                color: action.color,
                eventsFiltered: [...newCollection[0].collections]
            }
        case SETMSG:
            return {
                ...state,
                successMsg: ''
            }
        default:
            return state;
    }
}