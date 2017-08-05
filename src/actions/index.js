import axios from 'axios';
import * as types from './actionTypes';

const timeout = 20000;
const apiRoot = 'http://reblws.me:5000/api/order/';
let localStorage = window.localStorage;

function receiveCounts(json) {
  return {
    type: types.RECEIVE_COUNTS,
    response: json,
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

// TODO: Revamp
function saveOrderToLocalStorage(order, result) {
  const key = `${order}`;
  saveToLocalStorage(key, result);
}

function saveToLocalStorage(key, result) {
  localStorage.setItem(key, JSON.stringify(result));
}

function getDataFromLocalStorage(order) {
  const key = `${order}`;
  const stringData = localStorage[key];
  const stringDataExist = stringData !== null && stringData !== undefined;
  if (stringDataExist) return JSON.parse(localStorage[key]);
  else return null;
}


// TODO: Revamp to getData
export function fetchData(order) {
  const url = `${apiRoot}${order}`;

  // Check the data from localStorage first...
  const cachedData = getDataFromLocalStorage(order);
  const cachedDataExist = cachedData !== undefined && cachedData !== null;

  // Need to save to localStorage
  return (dispatch) => {
    // isLoading is true
    dispatch(requestData());

    if (cachedDataExist) {
      dispatch(receiveCounts(cachedData));
    } else {
      return axios({
      url,
      timeout: timeout,
      method: 'get',
      responseType: 'json',
    })
      .then((response) => {
        // Save to localStorage here
        saveOrderToLocalStorage(order, response.data);
        dispatch(receiveCounts(response.data));
      })
      .catch((response) => {
        dispatch(receiveError(response.data));
      });
    }
  };
}

// function uOrder(newOrder) {
//   // fetchData(`http://reblws.me:5000/api/order/${newOrder}`);
//   const url = `http://reblws.me:5000/api/order/${newOrder}`;
  // fetchData(newOrder);
//   // Fetch data
//   //  - From local storage
//   //  - Persist it longer
//   //  - From the api if doesn't exist
//   // Update the order
// }

export function updateOrder(newOrder) {
  return {
    type: types.UPDATE_ORDER,
    newOrder,
  };
}

// TODO: updateSort
export function updateSort(newSort) {
  return {
    type: types.UPDATE_SORT,
    newSort,
  };
}
