import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMeter} from '../../models/Meter';

export type MeterState = {
  meters: IMeter[];
};

const initialState: MeterState = {
  meters: [],
};

export const meterSlice = createSlice({
  name: 'meter',
  initialState,
  reducers: {
    setMetersRedux: (state, action: PayloadAction<IMeter[]>) => {
      if (action.payload) {
        state.meters = action.payload.sort(
          (a, b) => Number(a.meterNo) - Number(b.meterNo),
        );
      }
    },
  },
  extraReducers: () => {},
});

export const {setMetersRedux} = meterSlice.actions;

export default meterSlice.reducer;
