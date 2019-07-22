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
            return initialState.date = action.date;
        default:
            return state;
    }
}