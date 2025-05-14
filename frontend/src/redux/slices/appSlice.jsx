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
                state.kiosk = payload;
                // console.log(state.kiosk)

            }
        },
        setCityHallRedux: (state, { payload }) => {
            if (payload) {
                // console.log(payload);
                state.cityHall = payload
            }
        },
        setUserRedux: (state, { payload }) => {
            if (payload) {
                state.user = payload;
            }
        }
    },
    // extraReducers: builder => { }
});

// Reducer ve actions dışa aktarılır
export const { setWaterCompaniesRedux, setCityHallRedux, setKioskRedux, setUserRedux } = appSlice.actions;

export default appSlice.reducer;
