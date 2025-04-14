import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IWaterCard} from '../../models/WaterCard';

export type WaterCardState = {
  waterCards: IWaterCard[];
};

const initialState: WaterCardState = {
  waterCards: [],
};

export const waterCardSlice = createSlice({
  name: 'waterCard',
  initialState,
  reducers: {
    setWaterCardsRedux: (state, action: PayloadAction<IWaterCard[]>) => {
      // console.log(action.payload);
      if (action.payload) {
        state.waterCards = action.payload.sort(
          (a, b) => Number(a.meterNo) - Number(b.meterNo),
        );
      }
    },
    addWaterCardRedux: (state, action: PayloadAction<IWaterCard>) => {
      // console.log(action.payload);
      state.waterCards?.push(action.payload);
    },
    removeWaterCardRedux: (state, action: PayloadAction<IWaterCard>) => {
      const waterCardId = action.payload.id;
      state.waterCards = state.waterCards?.filter(
        waterCard => waterCard.id !== waterCardId,
      );
    },
    updateWaterCardRedux: (
      state,
      action: PayloadAction<{amount: number; waterCard: IWaterCard}>,
    ) => {
      const {amount, waterCard} = action.payload;

      // console.log(action.payload);
      const waterCard_ = state.waterCards.find(
        (_waterCard: IWaterCard) => _waterCard.id === waterCard.id,
      );

      if (waterCard_) {
        waterCard_.credit += amount;
      }
      // console.log(waterCard_);
    },
  },
  extraReducers: () => {},
});

export const {
  setWaterCardsRedux,
  removeWaterCardRedux,
  addWaterCardRedux,
  updateWaterCardRedux,
} = waterCardSlice.actions;

export default waterCardSlice.reducer;
