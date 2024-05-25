import axios from 'axios';
import { getUserToken } from './localStorage.utils';

const baseURL = 'http://localhost:3001/api';

const userToken = getUserToken() 

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${userToken}`
  }
});

export default api;

