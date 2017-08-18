import axios from 'axios';

const config = {
  timeout: 20000,
  baseURL: 'http://yaponiya.reblws.me:5000/api',
  method: 'get',
};

export default axios.create(config);
