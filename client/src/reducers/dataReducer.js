import { GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS, ADDITEM_REQUEST, ADDITEM_FAILURE, ADDITEM_SUCCESS, DELETEITEM_FAILURE, DELETEITEM_REQUEST, DELETEITEM_SUCCESS, EDITITEM_FAILURE, EDITITEM_REQUEST, EDITITEM_SUCCESS, UPDATESTATE_REQUEST, UPDATESTATE_SUCCESS, UPDATESTATE_FAILURE } from '../actions/types';

const initialState = {
    data: '',
    msg: ''
};

export default function dataReducer(state = initialState, action) {
    console.log("action");
    console.log(action);

    switch (action.type) {
        case GETALL_REQUEST:
            return initialState.msg = 'loading';
        case GETALL_SUCCESS:
            return initialState.data = action.users;
        case GETALL_FAILURE:
            return initialState.msg = "Failed to get";
        case ADDITEM_REQUEST:
            return initialState.msg = "loading";
        case ADDITEM_SUCCESS:
            return [...initialState.data, action.payload];
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
        case UPDATESTATE_REQUEST:
            return initialState.msg = "updating...";
        case UPDATESTATE_SUCCESS: 
            return initialState.data = action.payload;
        case UPDATESTATE_FAILURE:
            return initialState.msg ="Did not update";
        default:
            return state;
    }
}