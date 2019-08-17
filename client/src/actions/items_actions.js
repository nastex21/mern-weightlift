import {
  ADDITEM_FAILURE, ADDITEM_REQUEST, ADDITEM_SUCCESS,
  SAVECHANGES_FAILURE, SAVECHANGES_REQUEST, SAVECHANGES_SUCCESS,
  UPDATESTATE, UPDATEEVENT, SETDATE, FILTEREVENTS
} from './types';
import { userService } from '../services/user.services';


export const itemsConst = {
  addItem,
  saveChanges
}

/* ADD ITEM(S) DISPATCH */
function addItem(options) {
  console.log("it's running")
  return dispatch => {
    dispatch(request());
    console.log("add data")
    console.log(options);
    userService.addItem(options)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );

    function request() { return { type: ADDITEM_REQUEST } }
    function success(users) { return { type: ADDITEM_SUCCESS, users } }
    function failure(error) { return { type: ADDITEM_FAILURE, error } }
  }
}

/* EDIT ITEM(S) DISPATCH */
function saveChanges(data) {
  console.log("save changes is running item_actions");
  return dispatch => {
    dispatch(request());
    console.log("after request")
    userService.saveChanges(data)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );

    function request() { return { type: SAVECHANGES_REQUEST } };
    function success(users) { return { type: SAVECHANGES_SUCCESS, users } };
    function failure(error) { return { type: SAVECHANGES_FAILURE, error } };
  }
}


/*UPDATE ITEM STATE */
export const updateState = (data) => dispatch => {
  dispatch({
    type: UPDATESTATE,
    data
  })
  return Promise.resolve();
}

/* UPDATE EVENT STATE */

export const updateEvent = (data) => dispatch => {
  dispatch({
    type: UPDATEEVENT,
    data
  })
  return Promise.resolve();
}

/*SET DATE */

export const setDate = (date, dateShort) => dispatch => {
  dispatch({
    type: SETDATE,
    date, dateShort
  })
}

/*FILTER EVENTS */

export const filterEvent = (hyphenDate, dateVal, color) => dispatch => {
  dispatch({
    type: FILTEREVENTS,
    hyphenDate, dateVal, color
  })
}