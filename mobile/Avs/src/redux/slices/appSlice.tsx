import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICityHall} from '../../models/CityHall';

export type AppState = {
  cityHall: ICityHall | null;
};

const initialState: AppState = {
  cityHall: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCityHallRedux: (state, action: PayloadAction<ICityHall>) => {
      if (action.payload) {
        state.cityHall = action.payload;
      }
    },
  },
  extraReducers: () => {},
});

export const {setCityHallRedux} = appSlice.actions;

export default appSlice.reducer;
