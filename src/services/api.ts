import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CURRENT_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb290IiwiaXNfYWRtaW4iOiJ0cnVlIiwiZXhwIjoxNzUxNjg0ODM2fQ.084TIvOU56nrh09goWuI1V6jcJGoXTpNNTxfVokaKM0';


if (!BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL is not defined in .env file')
}

console.log(BASE_URL)

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `BEARER ${CURRENT_BEARER_TOKEN}`
    },
});

export default api;