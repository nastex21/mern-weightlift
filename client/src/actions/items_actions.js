import {
  ADDITEM_FAILURE, ADDITEM_REQUEST, ADDITEM_SUCCESS,
  SAVECHANGES_FAILURE, SAVECHANGES_REQUEST, SAVECHANGES_SUCCESS,
  UPDATESTATE, UPDATEEVENT, SETDATE, FILTEREVENTS, FILTERBUTTON
} from './types';
import { userService } from '../services/user.services';


export const itemsConst = {
  addItem,
  saveChanges
}

/* ADD ITEM(S) DISPATCH */
function addItem(options) {
  return dispatch => {
    dispatch(request());

    return new Promise((resolve, reject) => {
      userService.addItem(options)
        .catch(error => {
          dispatch(failure(error.toString()));
          reject(error);
        })
        .then(users => {
          dispatch(success(users));
          resolve(users);
        })
    })
    function request() { return { type: ADDITEM_REQUEST } }
    function success(users) { return { type: ADDITEM_SUCCESS, users } }
    function failure(error) { return { type: ADDITEM_FAILURE, error } }
  }
}

/* SAVE CHANEGS DISPATCH */
function saveChanges(data) {
  return dispatch => {
    dispatch(request());
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

/*FILTER BUTTON */

export const filterButton = (filterEvents, flag) => dispatch => {
  dispatch({
    type: FILTERBUTTON,
    filterEvents, flag
  })
}