import { ADD_ITEM, DELETE_ITEM, FETCH_DATA } from '../actions/types';

export default function dataReducer(state = [], action) {
    console.log("action");
    console.log(action);
    switch (action.type) {
        case ADD_ITEM:
            return [...state, action.payload];
        case DELETE_ITEM:
            return state.filter(post => post._id !== action.payload.id);
        case FETCH_DATA:
            return action;
        default:
            return state;
    }
}