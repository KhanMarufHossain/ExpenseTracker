import {createSlice} from '@reduxjs/toolkit'

const CurrencySlice= createSlice({
    name: "currency",
    initialState: {
        code: '',
    },
    reducers: 
    {
        setCurrencyCode: (state, action)=>{
            state.code = action.payload;
        },
    }
});

export default CurrencySlice.reducer;
export const {setCurrencyCode}  = CurrencySlice.actions;