import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../models/User';
import {RootState} from '../store';
import axios from 'axios';

export type UserState = {
  user?: IUser | null;
};

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRedux: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    updateUserRedux: (state, action: PayloadAction<IUser>) => {
      const {email, phoneNumber} = action.payload;
      state.user = {
        ...state.user,
        email: email,
        phoneNumber: phoneNumber,
      };
    },
  },
});

export const {setUserRedux, updateUserRedux} = userSlice.actions;

export default userSlice.reducer;
