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
        }
    }
});