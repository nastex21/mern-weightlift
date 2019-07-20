import { ADDITEM_FAILURE, ADDITEM_REQUEST, ADDITEM_SUCCESS, EDITITEM_FAILURE, EDITITEM_REQUEST, EDITITEM_SUCCESS, DELETEITEM_REQUEST, DELETEITEM_SUCCESS, DELETEITEM_FAILURE, UPDATESTATE} from './types';
import { itemService } from '../services/dataModifier';

export const itemsConst = {
    addItem,
    delItem,
    editItem,
    updateState
}

/* ADD ITEM(S) DISPATCH */
function addItem(id, collection, date, flag) {
    return dispatch => {
      dispatch(request());
      console.log("add item actions.js")
      console.log(id);
      console.log(collection);
      console.log(date);
      console.log(flag);
      var item = {
        id: id,
        collection: collection,
        date: date,
        flag: flag
      }
      itemService.addItem(item)
        .then(
          data => dispatch(success(item)),
          error => dispatch(failure(error.toString()))
        )
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
  function updateState(data) {

    return {
      type: UPDATESTATE,
      data
    }
  }