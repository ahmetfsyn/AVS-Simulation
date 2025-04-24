import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthPayload} from '../../models/types/AuthPayload';

export type AuthState = {
  accessToken?: string | null;
  refreshToken?: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentialsRedux: (state, action: PayloadAction<AuthPayload>) => {
      const {accessToken, refreshToken} = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    removeCredentialsRedux: state => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const {setCredentialsRedux, removeCredentialsRedux} = authSlice.actions;

export default authSlice.reducer;
