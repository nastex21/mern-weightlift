import { ADDITEM_FAILURE, ADDITEM_REQUEST, ADDITEM_SUCCESS, EDITITEM_FAILURE, EDITITEM_REQUEST, EDITITEM_SUCCESS, DELETEITEM_REQUEST, DELETEITEM_SUCCESS, DELETEITEM_FAILURE, UPDATESTATE, UPDATEEVENT, SETDATE, FILTEREVENTS } from './types';
import axios from 'axios';

export const itemsConst = {
  addItem,
  delItem,
  editItem
}

/* ADD ITEM(S) DISPATCH */
function addItem(options) {
  return dispatch => {
    dispatch(request());
    console.log("options");
    console.log(options);
    var item = {
      id: options.id,
      collection: options.collection,
      date: options.date,
      flag: options.flag
    };

    const storedData = JSON.parse(localStorage.getItem('user'));

    var config = {
      headers: { 'Authorization': "bearer " + storedData.token }
    };

    axios.post("/api/add-items", { id: item.id, collection: item.collection, date: item.date, flag: item.flag }, config)
      .then(data => {
        console.log("data");
        console.log(data);
        var newObj = {};
        let eventsArr = [];
        data.data.logs.map(function (item) {
          if (item.collections.length > 0) {
            eventsArr.push({
              "title": "Weights",
              "date": item.date,
              "color": "#d9534f",
              "collections": item.collections
            })
          }
        })
        data.data.cardiologs.map(function (item) {
          if (item.collections.length > 0) {
            eventsArr.push({
              "title": "Cardio",
              "date": item.date,
              'color': '#0275d8',
              "collections": item.collections
            })
          }
        });

        data.data.bwlogs.map(function (item) {
          console.log(item);
          if (item.collections.length > 0) {
            eventsArr.push({
              "title": "Bodyweight",
              "date": item.date,
              'color': '#5cb85c',
              "collections": item.collections
            })
          }
        });

        data.data.vidslogs.map(function (item) {
          if (item.collections.length > 0) {
            eventsArr.push({
              "title": "Classes/Videos",
              "date": item.date,
              'color': '#f0ad4e',
              "collections": item.collections
            })
          }
        });
        newObj.events = eventsArr;
        newObj.logs = data.data.logs;
        newObj.cardiologs = data.data.cardiologs;
        newObj.bwlogs = data.data.bwlogs;
        newObj.vidslogs = data.data.vidslogs;
        console.log("newObj");
        console.log(newObj);
        dispatch(success(newObj))
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