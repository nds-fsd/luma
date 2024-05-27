import axios from 'axios';
import { getUserToken } from './localStorage.utils';

export const api = () => {
    const token = getUserToken();
    return axios.create({
        baseURL: "http://localhost:3001/api",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
} 