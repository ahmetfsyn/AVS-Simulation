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
      action: PayloadAction<{updatedWaterCard: IWaterCard}>,
    ) => {
      const {updatedWaterCard} = action.payload;

      state.waterCards = state.waterCards.map(card =>
        card.id === updatedWaterCard.id
          ? {...card, credit: updatedWaterCard.credit}
          : card,
      );
      // console.log(state.waterCards);
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
