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
            return {...state,
                events: action.data.map((item) => item)
            }
        case SETDATE:
            return {...state,
                date: action.date,
                dateShortened: action.dateShort,
                dateText: state.date !== undefined ? state.date.toLocaleString('en-US', options) : null
            }
        default:
            return state;
    }
}