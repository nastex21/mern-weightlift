import { UPDATEEVENT, SETDATE } from '../actions/types';

var initialState = {
    date: '',
    events: [],
    eventsFiltered: [],
};


export default function eventsReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATEEVENT:
            return initialState.events = action.data.map((item) => item);
        case SETDATE:
            initialState.date = action.date;
            return initialState
        default:
            return state;
    }
}