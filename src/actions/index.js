import axios from 'axios';
import * as types from './actionTypes';

export const updateKanjiCount = (id, count) => {
  return {
    type: 'UPDATE_COUNT',
    id,
    count,
  };
};

export const fetchNewCounts = (response) => {
  return {
    type: 'FETCH_DATA',
    response,
  };
};


function requestData() {
  return {
    type: types.REQUEST_DATA,
  };
}

function receiveData(json)  {
  return {
    type: types.RECEIVE_DATA,
    data: json,
  };
}

function receiveError(json) {
  return {
    type: types.RECEIVE_ERROR,
    data: json,
  }
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
      dispatch(receiveData(response.data));
    }).catch((response) => {
      dispatch(receiveError(response.data));

      // Here can force redirect if we set up createHistory
      // dispatch(pushState(null, '/error'));
    });
  };
}
