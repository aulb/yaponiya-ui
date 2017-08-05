import * as types from './actionTypes';
import APIClient from '../helpers/APIClient';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../helpers/localStorage';

// TODO: Do updateSorting
function updateSort(newSort) {
  return {
    type: types.UPDATE_SORT,
    newSort,
  };
}

function updateOrder(json, newOrder) {
  return {
    type: types.UPDATE_ORDER,
    response: json,
    newOrder,
  };
}

function receiveError(json) {
  return {
    type: types.RECEIVE_ERROR,
    response: json,
  };
}

function requestData() {
  return {
    type: types.REQUEST_DATA,
  };
}

/*
 * Wrapper functions to update the ordering and sorting.
 */
export function switchOrder(newOrder) {
  // Check the data from localStorage first...
  const cachedData = getDataFromLocalStorage(newOrder);

  return (dispatch) => {
    // Starting...
    dispatch(requestData());

    // Use cachedData to update the order to make less call to the API
    if (cachedData) return dispatch(updateOrder(cachedData, newOrder));
    return APIClient
      .get(`/order/${newOrder}`)
      .then((response) => {
        // Cache API data to localStorage
        saveDataToLocalStorage(newOrder, response.data);
        dispatch(updateOrder(response.data, newOrder));
      })
      .catch((response) => {
        dispatch(receiveError(response.data));
      });
  };
}

export function switchSort(newSort) {
  return (dispatch) => {
    dispatch(updateSort(newSort));
  };
}
