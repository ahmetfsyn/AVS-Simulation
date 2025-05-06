/* eslint-disable no-undef */
import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL + '/api',
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        "ngrok-skip-browser-warning": "69420"
    }
})