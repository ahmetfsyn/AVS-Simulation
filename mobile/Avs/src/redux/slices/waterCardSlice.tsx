import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IWaterCard} from '../../models/WaterCard';
import {WaterCardPayload} from '../../models/types/WaterCardPayload';

export type WaterCardState = {
  waterCards?: IWaterCard[];
};

const initialState: WaterCardState = {
  waterCards: [],
};

export const waterCardSlice = createSlice({
  name: 'waterCard',
  initialState,
  reducers: {
    setWaterCards: (state, action: PayloadAction<WaterCardPayload>) => {
      // console.log(action.payload);
      if (action.payload.waterCards) {
        state.waterCards = action.payload.waterCards;
      }
    },
    removeWaterCards: state => {
      state.waterCards = initialState.waterCards;
    },
  },
  extraReducers: () => {},
});

export const {setWaterCards, removeWaterCards} = waterCardSlice.actions;

export default waterCardSlice.reducer;
