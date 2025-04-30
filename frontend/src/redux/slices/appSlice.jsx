/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    waterCard: null,
    paymentTypes: [],
    waterCompanies: [],
    cityHall: null,
    kiosk: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setWaterCompaniesRedux: (state, { payload }) => {
            if (payload) {
                // console.log(payload)
                state.waterCompanies = payload;
            }
        },
        setKioskRedux: (state, { payload }) => {
            if (payload) {
                console.log(payload)
                state.kiosk = payload;
            }
        },
        setCityHallRedux: (state, { payload }) => {
            if (payload) {
                // console.log(payload);
                state.cityHall = payload
            }
        }
    },
    // extraReducers: builder => { }
});

// Reducer ve actions dışa aktarılır
export const { setWaterCompaniesRedux, setCityHallRedux } = appSlice.actions;

export default appSlice.reducer;
