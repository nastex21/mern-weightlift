import { UPDATEEVENT, SETDATE } from '../actions/types';

var initialState = {
    date: '',
    events: [],
    eventsFiltered: [],
};


export default function eventsReducer(state = initialState, action) {
    console.log(action);
    console.log(action.type);
    switch (action.type) {
        case UPDATEEVENT:
            initialState.events = action.data.map((item) => item);
            return initialState;
        case SETDATE:
            initialState.date = action.date;
            return initialState;
        default:
            return state;
    }
}