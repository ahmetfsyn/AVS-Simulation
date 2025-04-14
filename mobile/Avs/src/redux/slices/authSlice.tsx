import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../models/User';
import {LoginPayload} from '../../models/types/LoginPayload';
import {RootState} from '../store';
import axios from 'axios';

export type AuthState = {
  user?: IUser | null;
  accessToken?: string | null;
  refreshToken?: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, {getState, rejectWithValue}) => {
    const {refreshToken} = (getState() as RootState).auth;
    try {
      const response = await axios.post(
        'http://192.168.137.1:7154/api/auth/refresh',
        {
          refreshToken,
        },
      );
      console.log('refresh token : ', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginPayload>) => {
      const {userDto, tokenDto} = action.payload;
      state.user = userDto;
      console.log(userDto);
      state.accessToken = tokenDto.accessToken;
      state.refreshToken = tokenDto.refreshToken;
      // console.log(state.user);
    },
    removeCredentials: state => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const {setCredentials, removeCredentials} = authSlice.actions;

export default authSlice.reducer;
