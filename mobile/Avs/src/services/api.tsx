import axios from 'axios';
import {store} from '../redux/store';
import {BACKEND_API_URL} from '@env';
import {refreshUserToken} from './authService';
import {removeCredentialsRedux} from '../redux/slices/authSlice';

const BACKEND_URL = BACKEND_API_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 🔐 AccessToken ekleme
api.interceptors.request.use(
  async config => {
    const state = store.getState();
    const token = state.auth.accessToken;
    // console.log('token : ', token);
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
      if (isRefreshing) {
        // console.log('401 geldi');

        // Diğer istekleri sıraya al
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshUserToken({
          accessToken: store.getState().auth.accessToken!,
          refreshToken: store.getState().auth.refreshToken!,
        });
        console.log('action : ', data);
        const newAccessToken = data.accessToken;
        console.log('new accessToken : ', newAccessToken);
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(removeCredentialsRedux());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
