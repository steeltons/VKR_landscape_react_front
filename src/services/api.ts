import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL is not defined in .env file')
}

console.log(BASE_URL)

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default api;