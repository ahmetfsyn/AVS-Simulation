import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, User} from '../../models/User';
import {IWaterCardInfo, WaterCardInfo} from '../../models/WaterCardInfo';
import {IUserInfo, UserInfo} from '../../models/UserInfo';
import {IWaterCard} from '../../models/WaterCard';
import {generateUniqueSevenDigitNumber} from '../../utils/generateUniqueSevenDigitNumber';
// import type {PayloadAction} from '@reduxjs/toolkit';

export interface AppState {
  user: object | null;
  waterCards: WaterCardInfo[];
}

const initialState: AppState = {
  user: null,
  waterCards: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
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

        const user: IUserInfo = new UserInfo(
          newUser.id,
          null,
          null,
          newUser.firstName,
          newUser.lastName,
          newUser.tcNo,
          generateUniqueSevenDigitNumber(),
        );

        console.log(user.isAuth);

        state.user = newUser.toJson();
      } catch (error) {
        console.error(error);
      }
    },

    signIn: (state, action): void => {
      const {payload} = action;
      console.log(payload);

      try {
        const user: IUserInfo = payload;
        console.log(user);

        state.user = {
          ...user,
          isAuth: true,
        };
      } catch (error) {
        console.error(error);
      }
    },

    addWaterCard: (state, action: PayloadAction<IWaterCard>) => {},
    removeWaterCard: (state, action: PayloadAction<IWaterCardInfo>) => {
      state.waterCards = state.waterCards.filter(
        waterCard => waterCard.id !== action.payload.id,
      );
    },
  },
  extraReducers: () => {},
});

export const {addWaterCard, removeWaterCard, signUp, signIn} = appSlice.actions;

export default appSlice.reducer;
