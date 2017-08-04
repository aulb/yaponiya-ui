import axios from 'axios';
import * as types from './actionTypes';

const timeout = 20000;

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

export function fetchData(url) {
  return (dispatch) => {
    dispatch(requestData());
    return axios({
      url,
      timeout: timeout,
      method: 'get',
      responseType: 'json',
    })
      .then((response) => {
        dispatch(receiveCounts(response.data));
      })
      .catch((response) => {
        dispatch(receiveError(response.data));
      });
  };
}

// TODO: updateOrder
export function updateOrder(newOrder) {
  return {
    type: types.UPDATE_ORDER,
    newOrder,
  };
}
