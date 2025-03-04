import { createSlice } from '@reduxjs/toolkit';
import { CompanyEnum, PaymentTypeEnum } from '../../constants/const';



const initialState = {
    isLoading: false,
    user: {
        firstName: "Ahmet",
        lastName: "Sayan",
        tcNo: "11003300330",
        email: "ahmet@asd.com"
    },
    waterCard: {
        customerId: 1,
        companyName: CompanyEnum.BAYLAN,
        balance: 0, // balance yani ana su ton miktarı
        debt: 0, // debt yani tl borç miktarı
        credit: 0, // credit yani yedek su ton miktarı
        subscriberNo: 123321123,
    },
    paymentType: PaymentTypeEnum.PAYPASS,
};

const appSlice = createSlice({
    name: 'app',  // Slice'ın adı
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    // extraReducers: builder => { }
});

// Reducer ve actions dışa aktarılır
export const { setLoading, setError, setUser } = appSlice.actions;

export default appSlice.reducer;
