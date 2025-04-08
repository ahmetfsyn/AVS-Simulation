import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../models/User';
import {LoginPayload} from '../../models/types/LoginPayload';

export type AuthState = {
  user?: IUser | null;
  accessToken?: string;
  refreshToken?: string;
};

const initialState: AuthState = {
  user: null,
  accessToken: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginPayload>) => {
      const {userDto, tokenDto} = action.payload;

      state.user = userDto;
      state.accessToken = tokenDto.accessToken;
      state.refreshToken = tokenDto.refreshToken;
      // console.log(state.user);
    },
    removeCredentials: state => {
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const {setCredentials, removeCredentials} = authSlice.actions;

export default authSlice.reducer;
