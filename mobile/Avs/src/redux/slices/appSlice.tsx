import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, User} from '../../models/User';
import {IWaterCardInfo} from '../../models/WaterCardInfo';
import {IUserInfo} from '../../models/UserInfo';
import {IWaterCard} from '../../models/WaterCard';
// import type {PayloadAction} from '@reduxjs/toolkit';

export interface AppState {
  user: object | null;
}

const initialState: AppState = {
  user: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // updateWaterCard: (state, action: PayloadAction<IWaterCardInfo>) => {
    //   state.waterCards[action.payload.id].subscriberNo =
    //     action.payload.subscriberNo;
    //   state.waterCards[action.payload.id].balance = action.payload.balance;
    //   state.waterCards[action.payload.id].debt = action.payload.debt;
    //   state.waterCards[action.payload.id]. = action.payload.debt;
    // },

    signUp: (state, action: PayloadAction<IUser>): void => {
      const {payload} = action;
      try {
        const newUser: IUser = new User(
          payload.id,
          payload.firstName,
          payload.lastName,
          payload.tcNo,
          payload.password,
        );
        state.user = newUser.toJson();
      } catch (error) {
        console.error(error);
      }
    },

    //  ! Burda kaldım . signIn func yazcam
    signIn: (state, action): void => {
      const {payload} = action;
      console.log(payload);
    },

    addWaterCard: (state, action: PayloadAction<IWaterCard>) => {},
    removeWaterCard: (state, action: PayloadAction<IWaterCardInfo>) => {
      state.user.waterCards = state.user.waterCards.filter(
        waterCard => waterCard.id !== action.payload.id,
      );
    },
  },
  extraReducers: () => {},
});

export const {addWaterCard, removeWaterCard, signUp} = appSlice.actions;

export default appSlice.reducer;
