import { GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS, ADDITEM_REQUEST, ADDITEM_FAILURE, ADDITEM_SUCCESS, DELETEITEM_FAILURE, DELETEITEM_REQUEST, DELETEITEM_SUCCESS, EDITITEM_FAILURE, EDITITEM_REQUEST, EDITITEM_SUCCESS, UPDATESTATE } from '../actions/types';

var initialState = {
    data: '',
    events: [],
    eventsFiltered: [],
    id: '',
    username: '',
    weightLogs: [],
    cardioLogs: '',
    bwLogs: '',
    vidsLogs: '',
    msg: ''
};

export default function dataReducer(state = initialState, action) {
    console.log("action");
    console.log(action);
    switch (action.type) {
        case GETALL_REQUEST:
            return initialState.msg = 'loading';
        case GETALL_SUCCESS:
            //return initialState.data = action.users;
            initialState.username = action.user.username;
            initialState.id = action.user._id;
            initialState.events = [...action.user.events];
            return initialState;
        case GETALL_FAILURE:
            return initialState.msg = "Failed to get";
        case ADDITEM_REQUEST:
            return initialState.msg = "loading";
        case ADDITEM_SUCCESS:
            initialState.weightLogs = {...action.users.logs}
            initialState.cardioLogs = action.users.cardiologs;
            initialState.bwLogs = action.users.bwlogs;
            initialState.vidsLogs = action.users.vidslogs;
            initialState.events = {...action.users.events}
            return initialState;
        case ADDITEM_FAILURE:
            return initialState.msg = 'Item addition failed';
        case DELETEITEM_REQUEST:
            return initialState.msg = "deleting...";                              
        case DELETEITEM_SUCCESS:
            return initialState.data.filter(item => item._id !== action.payload.id);
        case DELETEITEM_FAILURE:
            return initialState.msg = 'Did not delete';
        case EDITITEM_REQUEST:
            return initialState.msg = 'Editing...';
        case EDITITEM_SUCCESS:
            return initialState;
        case EDITITEM_FAILURE:
            return initialState.msg = "Did not edit";
        case UPDATESTATE: 
            return initialState = { msg: 'Success', 
            id: action.data._id, 
            username: action.data.username, 
            weightLogs: action.data.logs, 
            cardioLogs: action.data.cardiologs, 
            bwLogs: action.data.bwlogs, 
            vidsLogs: action.data.vidslogs,
            events: action.data.events};
        default:
            return state;
    }
}