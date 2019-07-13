import { OPEN_MODAL, CLOSE_MODAL, FETCH_DATA, ADD_ITEM, DELETE_ITEM, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';
import axios from 'axios';

export function openModal() {
  return {
    type: OPEN_MODAL
  }
};

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
};

export const fetchData = (data) => {
  return {
    type: FETCH_DATA,
    data
  }
};

export const fetchAllData = () => {
  return (dispatch) => {
    return axios.get('/api/dashboard/')
      .then(response => {
        dispatch(fetchData(response.data.user))
      })
      .catch(error => {
        throw(error);
      });
  };
};