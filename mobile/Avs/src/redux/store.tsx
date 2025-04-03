import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import waterCardReducer from './slices/waterCardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    waterCard: waterCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
