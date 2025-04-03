import axios from 'axios';
import {API_URL, API_KEY} from 'react-native-dotenv'; // Bazen dotenv çalışmıyor nedeni bilinmiyor.

const api = axios.create({
  baseURL: 'http://192.168.137.1:7154',
  headers: {
    Accept: 'application/json',
  },
});

// ? json web token geleceği zaman alt tarafı aktif et

// api.interceptors.request.use(
//     async (config) => {
//       const token = 'KAYITLI_TOKEN';
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

export default api;
