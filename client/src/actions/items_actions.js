import { ADDITEM_FAILURE, ADDITEM_REQUEST, ADDITEM_SUCCESS, EDITITEM_FAILURE, EDITITEM_REQUEST, EDITITEM_SUCCESS, DELETEITEM_REQUEST, DELETEITEM_SUCCESS, DELETEITEM_FAILURE, UPDATESTATE, UPDATEEVENT, SETDATE } from './types';
import { itemService } from '../services/dataModifier';
import axios from 'axios';

export const itemsConst = {
  addItem,
  delItem,
  editItem
}

/* ADD ITEM(S) DISPATCH */
function addItem(id, collection, date, flag) {
  return dispatch => {
    dispatch(request());
    var item = {
      id: id,
      collection: collection,
      date: date,
      flag: flag
    };

    const storedData = JSON.parse(localStorage.getItem('user'));

    var config = {
      headers: { 'Authorization': "bearer " + storedData.token }
    };

    return axios.post("/api/add-items", { id: item.id, collection: item.collection, date: item.date, weightFlag: 1 }, config)
      .then(data => {
        dispatch(success(data))
      })
      .catch(error => {
        dispatch(failure(error.toString()))
      })
  }

  function request() { return { type: ADDITEM_REQUEST } };
  function success(users) { return { type: ADDITEM_SUCCESS, users } };
  function failure(error) { return { type: ADDITEM_FAILURE, error } };
}

/* EDIT ITEM(S) DISPATCH */
function editItem() {

}
/* DELETE ITEM(S) DISPATCH */
function delItem() {

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
  console.log("data");
  console.log(data);
  dispatch({
    type: UPDATEEVENT,
    data
  })
  return Promise.resolve();
}

/*SET DATE */

export const setDate = (date, dateShort) => dispatch => {
  console.log('date');
  console.log(date);
  dispatch({
    type: SETDATE,
    date, dateShort
  })
}