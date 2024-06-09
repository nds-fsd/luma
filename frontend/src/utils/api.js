import axios from 'axios';
import { getUserToken, removeSession, isTokenExpired } from './localStorage.utils';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const api = () => {
  const token = getUserToken();

  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (isTokenExpired(token)) {
          removeSession();
          history.push('/login');
          window.location.reload(); 
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
