import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS,
    ADDITEM_REQUEST, ADDITEM_FAILURE, ADDITEM_SUCCESS, SAVECHANGES_FAILURE, SAVECHANGES_REQUEST, SAVECHANGES_SUCCESS,
    UPDATESTATE, SETDATE, UPDATEEVENT, FILTEREVENTS, FILTERBUTTON
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
    loginFailure: '',
    loaded: 'false',
    successMsg: '', 
    weightFilterFlag: false,
    cardioFilterFlag: false,
    bwFilterFlag: false,
    vidsFilterFlag: false
} : {};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user,
                successMsg: ''
            };
        case LOGIN_SUCCESS:
            var eventsArr = [];
            action.user.data.data.logs.map(function (item) {
                eventsArr.push({
                    "title": "Weights",
                    "date": item.date,
                    "color": "#d9534f",
                    "collections": item.collections,
                    "display": 1
                })
            })
            action.user.data.data.cardiologs.map(function (item) {
                eventsArr.push({
                    "title": "Cardio",
                    "date": item.date,
                    'color': '#0275d8',
                    "collections": item.collections,
                    "display": 2
                })
            });

            action.user.data.data.bwlogs.map(function (item) {
                eventsArr.push({
                    "title": "Bodyweight",
                    "date": item.date,
                    'color': '#5cb85c',
                    "collections": item.collections,
                    "display": 3
                })
            });

            action.user.data.data.vidslogs.map(function (item) {
                eventsArr.push({
                    "title": "Classes/Videos",
                    "date": item.date,
                    'color': '#f0ad4e',
                    "collections": item.collections,
                    "display": 4
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
                eventsFiltered: [...eventsArr],
                loggedIn: true,
                successMsg: '',
                msg: ''
            };
        case LOGIN_FAILURE:
            return {
                loginFailure: true
            };
        case LOGOUT:
            return {};
        case GETALL_REQUEST:
            return { ...state, 
            msg: 'loading',     
            successMsg: '',
        }
        case GETALL_SUCCESS:
            var eventsArr = [];
            action.users.data.vidslogs.map(function (item) {
                eventsArr.push({
                    "title": "Classes/Videos",
                    "date": item.date,
                    'color': '#f0ad4e',
                    "collections": item.collections,
                    "display": 4
                })
            });
            action.users.data.bwlogs.map(function (item) {
                eventsArr.push({
                    "title": "Bodyweight",
                    "date": item.date,
                    'color': '#5cb85c',
                    "collections": item.collections,
                    "display": 3
                })
            });
            action.users.data.cardiologs.map(function (item) {
                eventsArr.push({
                    "title": "Cardio",
                    "date": item.date,
                    'color': '#0275d8',
                    "collections": item.collections,
                    "display": 2
                })
            });
            action.users.data.logs.map(function (item) {
                eventsArr.push({
                    "title": "Weights",
                    "date": item.date,
                    "color": "#d9534f",
                    "collections": item.collections,
                    "display": 1
                })
            })
            return {
                ...state,
                username: action.users.data.username,
                id: action.users.data._id,
                weightLogs: [...action.users.data.logs],
                cardioLogs: [...action.users.data.cardiologs],
                bwLogs: [...action.users.data.bwlogs],
                vidsLogs: [...action.users.data.vidslogs],
                events: [...eventsArr],
                eventsFiltered: [...eventsArr],
                loaded: 'false',
                loggedIn: true,
                successMsg: ''
            }
        case GETALL_FAILURE:
            return { ...state, 
                msg: "Failed to get",
                successMsg: '',
 };
        case ADDITEM_REQUEST:
            return { ...state, 
            msg: "loading",
            successMsg: '',
 };
        case ADDITEM_SUCCESS:
            return {
                ...state,
                weightLogs: [...action.users.logs],
                cardioLogs: [...action.users.cardiologs],
                bwLogs: [...action.users.bwlogs],
                vidsLogs: [...action.users.vidslogs],
                events: [...action.users.events],
                eventsFiltered: [...action.users.events],
                loaded: 'true',
                successMsg: ''
            }
        case ADDITEM_FAILURE:
            return state.msg = 'Item addition failed';
        case SAVECHANGES_REQUEST:
            return { ...state, msg: "loading", successMsg: '' };
        case SAVECHANGES_SUCCESS:
            var eventsArr = [];
            action.users.data.logs.map(function (item) {
                eventsArr.push({
                    "title": "Weights",
                    "date": item.date,
                    "color": "#d9534f",
                    "collections": item.collections,
                    "display": 1
                })
            })
            action.users.data.cardiologs.map(function (item) {
                eventsArr.push({
                    "title": "Cardio",
                    "date": item.date,
                    'color': '#0275d8',
                    "collections": item.collections,
                    "display": 2
                })
            });

            action.users.data.bwlogs.map(function (item) {
                eventsArr.push({
                    "title": "Bodyweight",
                    "date": item.date,
                    'color': '#5cb85c',
                    "collections": item.collections,
                    "display": 3
                })
            });

            action.users.data.vidslogs.map(function (item) {
                eventsArr.push({
                    "title": "Classes/Videos",
                    "date": item.date,
                    'color': '#f0ad4e',
                    "collections": item.collections,
                    "display": 4
                })
            });
            return {
                ...state,
                id: action.users.data._id,
                username: action.users.data.username,
                weightLogs: [...action.users.data.logs],
                cardioLogs: [...action.users.data.cardiologs],
                bwLogs: [...action.users.data.bwlogs],
                vidsLogs: [...action.users.data.vidslogs],
                events: [...eventsArr],
                eventsFiltered: [...eventsArr],
                loaded: 'false',
                successMsg: 'true',
                loggedIn: true

            }
        case SAVECHANGES_FAILURE:
            return state.successMsg = 'false';
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
                events: [...action.data.events],
                successMsg: ''
            };
        case SETDATE:
            return {
                ...state,
                date: action.date,
                dateShortened: action.dateShort,
                dateText: action.date.toLocaleString('en-US', options),
                successMsg: ''
            };
        case UPDATEEVENT:
            return {
                ...state,
                events: action.data.map((item) => item),
                eventsFiltered: action.data.map((item) => item),
                successMsg: ''
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
                date: action.dateVal,
                dateText: action.dateVal.toLocaleString('en-US', options),
                color: action.color,
                eventsFiltered: [...newCollection[0].collections],
                successMsg: ''
            }
        case FILTERBUTTON:
            return {
                ...state,
                eventsFiltered: [...action.filterEvents],
                weightFilterFlag: action.flag.weightFlag !== undefined ? action.flag.weightFlag : state.weightFilterFlag,
                cardioFilterFlag: action.flag.cardioFlag !== undefined ? action.flag.cardioFlag : state.cardioFilterFlag,
                vidsFilterFlag: action.flag.vidsFlag !== undefined ? action.flag.vidsFlag : state.vidsFilterFlag,
                bwFilterFlag: action.flag.bwFlag !== undefined ? action.flag.bwFlag : state.bwFilterFlag,
                loggedIn: true
            }

            default:
            return state;
    }
}