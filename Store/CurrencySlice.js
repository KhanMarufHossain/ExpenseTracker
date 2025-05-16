import {createSlice} from '@reduxjs/toolkit'

const CurrencySlice= createSlice({
    name: "currency",
    initialState: {
        code: '',
        balance : 0,
    },
    reducers: 
    {
        setCurrencyCode: (state, action)=>{
            state.code = action.payload;
        },
        setBalance: (state, action)=> {
            state.balance = action.payload;
        }
    }
});

export default CurrencySlice.reducer;
export const {setCurrencyCode, setBalance}  = CurrencySlice.actions;