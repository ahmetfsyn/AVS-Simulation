import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, User} from '../../models/User';
import {IWaterCardInfo, WaterCardInfo} from '../../models/WaterCardInfo';
import {IUserInfo, UserInfo} from '../../models/UserInfo';
import {IWaterCard} from '../../models/WaterCard';
import {generateUniqueSevenDigitNumber} from '../../utils/generateUniqueSevenDigitNumber';
import axios from 'axios';
import api from '../../services/api';
import {RegisterParams} from '../../models/types/AuthParams';
// import type {PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    firstName: '';
    lastName: '';
    email: '';
    tcNo: '';
    subscriberNo: '';
    isEmailVerified: false;
    isBanned: false;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
