import axios from 'axios';

const config = {
  timeout: 20000,
  baseURL: 'http://reblws.me:5000/api',
  method: 'get',
  responseType: 'json',
};

export default axios.create(config);
