import {createSlice} from '@reduxjs/toolkit'

const CurrencySlice= createSlice({
    name: "currency",
    initialState: {
        code: '',
    },
    reducers: 
    {
        setCurrency: (state, action)=>{
            state.code = action.payload;
        },
    }
});

export default CurrencySlice.reducer;
export const {setCurrency}  = CurrencySlice.actions;