import axios from 'axios';
import {store} from '../redux/store'; // redux store import et
import {refreshTokenThunk, removeCredentials} from '../redux/slices/authSlice'; // refresh için thunk
import {API_URL} from 'react-native-dotenv';

const api = axios.create({
  baseURL: 'http://192.168.137.1:7154',
  headers: {
    Accept: 'application/json',
  },
});

// 🔐 AccessToken ekleme
api.interceptors.request.use(
  async config => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 🔁 401 alınca refresh token deneme
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      store.getState().auth.refreshToken
    ) {
      originalRequest._retry = true;
      try {
        const action = await store.dispatch(refreshTokenThunk());

        const newAccessToken = action.payload?.accessToken;

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(removeCredentials());
      }
    }

    return Promise.reject(error);
  },
);

export default api;
