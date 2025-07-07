import axios from "axios";
import { parseJwt } from "../utils/token";
import { ApiException } from "../common/exceptions";
import { ErrorResponse } from "../common/models";

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
    const token = localStorage.getItem('accessToken');
    if (token) {
        const payload = parseJwt(token);
        const expDate = payload?.exp
        const now = Date.now() / 1000;

        if (expDate && expDate >= now) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            localStorage.removeItem('accessToken')
        }
    }

    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error);
        const response = error.response;
        const status : number = response.status;
        const data: ErrorResponse = response.data;

        throw new ApiException(data.detail, status);
    }
)

export default api;