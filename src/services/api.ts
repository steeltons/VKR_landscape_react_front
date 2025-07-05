import axios from "axios";
import { parseJwt } from "../utils/token";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


if (!BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL is not defined in .env file')
}

console.log(BASE_URL)

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        const payload = parseJwt(token);
        const expDate = payload?.exp
        const now = Date.now() / 1000;

        if (expDate && expDate >= now) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    return config;
})

export default api;