import axios from 'axios';
import { getUserToken } from './localStorage.utils';

export const api = () => {
    const token = getUserToken();
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL, 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
} 