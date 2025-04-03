import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IWaterCard} from '../../models/WaterCard';

export interface WaterCardState {
  waterCards: IWaterCard[] | null;
}

const initialState: WaterCardState = {
  waterCards: null,
};

export const waterCardSlice = createSlice({
  name: 'waterCard',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = waterCardSlice.actions;

export default waterCardSlice.reducer;
