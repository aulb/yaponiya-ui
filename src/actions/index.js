import axios from 'axios';
import * as types from './actionTypes';

function receiveCounts(json) {
  return {
    type: types.RECEIVE_COUNTS,
    json,
  };
}

function receiveError(json) {
  return {
    type: types.RECEIVE_ERROR,
    data: json,
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
      timeout: 20000,
      method: 'get',
      responseType: 'json',
    }).then((response) => {
      dispatch(receiveCounts(response.data));
    }).catch((response) => {
      dispatch(receiveError(response.data));
    });
  };
}
