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
      // console.log(action.payload);
      if (action.payload) {
        state.meters = action.payload.sort(
          (a, b) => Number(a.meterNo) - Number(b.meterNo),
        );
      }
    },
    removeMeterRedux: (state, action: PayloadAction<IMeter>) => {
      if (action.payload) {
        state.meters = state.meters.filter(
          meter => meter.id !== action.payload.id,
        );
        console.log('kalan meters :', state.meters);
      }
    },
  },
  extraReducers: () => {},
});

export const {setMetersRedux, removeMeterRedux} = meterSlice.actions;

export default meterSlice.reducer;
