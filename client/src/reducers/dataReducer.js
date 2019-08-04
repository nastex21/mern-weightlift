import { GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS, ADDITEM_REQUEST, ADDITEM_FAILURE, ADDITEM_SUCCESS, DELETEITEM_FAILURE, DELETEITEM_REQUEST, DELETEITEM_SUCCESS, EDITITEM_FAILURE, EDITITEM_REQUEST, EDITITEM_SUCCESS, UPDATESTATE } from '../actions/types';

var initialState = {
    data: '',
    events: [],
    eventsFiltered: [],
    id: '',
    username: '',
    weightLogs: [],
    cardioLogs: [],
    bwLogs: [],
    vidsLogs: [],
    msg: '',
    loaded: 'false'
};

export default function dataReducer(state = initialState, action) {
    console.log("action");
    console.log(action);
    switch (action.type) {
        case GETALL_REQUEST:
            return { ...state, msg: 'loading' }
        case GETALL_SUCCESS:
            let eventsArr = [];
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
                loaded: 'false'
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
        case DELETEITEM_REQUEST:
            return state.msg = "deleting...";
        case DELETEITEM_SUCCESS:
            return state.data.filter(item => item._id !== action.payload.id);
        case DELETEITEM_FAILURE:
            return state.msg = 'Did not delete';
        case EDITITEM_REQUEST:
            return state.msg = 'Editing...';
        case EDITITEM_SUCCESS:
            return state;
        case EDITITEM_FAILURE:
            return state.msg = "Did not edit";
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
        default:
            return state;
    }
}