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

// export const refreshTokenThunk = createAsyncThunk(
//   'auth/refreshToken',
//   async (_, {getState, rejectWithValue}) => {
//     const {refreshToken, accessToken} = (getState() as RootState).auth;
//     try {
//       const response = await axios.post('/api/auth/refresh-token', {
//         accessToken,
//         refreshToken,
//       });
//       console.log('refresh token dispatch response: ', response);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginPayload>) => {
      const {userDto, tokenDto} = action.payload;
      state.user = userDto;
      // console.log('userDto : ', userDto);
      state.accessToken = tokenDto.accessToken;
      state.refreshToken = tokenDto.refreshToken;
      console.log(tokenDto.refreshToken);
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
