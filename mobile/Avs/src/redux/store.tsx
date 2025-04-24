import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import waterCardReducer from './slices/waterCardSlice';
import meterReducer from './slices/meterSlice';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    waterCard: waterCardReducer,
    meter: meterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
