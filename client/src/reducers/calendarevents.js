import { UPDATEEVENT, SETDATE } from '../actions/types';

var initialState = {
    date: '',
    dateShortened: '',
    dateText: '',
    events: [],
    eventsFiltered: [],
};

export default function eventsReducer(state = initialState, action) {
    console.log(action);
    console.log(action.type);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    switch (action.type) {
        case UPDATEEVENT:
            initialState.events = action.data.map((item) => item);
            return initialState;
        case SETDATE:
            initialState.date = action.date;
            initialState.dateShortened = action.dateShort;
            initialState.dateText = initialState.date !== undefined ? initialState.date.toLocaleString('en-US', options) : null;
            return initialState;
        default:
            return state;
    }
}