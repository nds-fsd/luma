import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const userToken = getUserToken();

const api = axios.create({
  baseURL,
  headers:{'Authorization': `Bearer ${userToken}`}
});

export default api;

