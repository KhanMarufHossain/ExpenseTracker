import {createSlice} from '@reduxjs/toolkit'

const CurrencySlice= createSlice({
    name: "currency",
    initialState: {
        code: 'USD',
        
        income : 0,
        
    },
    reducers: 
    {
        setCurrencyCode: (state, action)=>{
            state.code = action.payload;
        },
       
        setIncome: (state, action )=>{
            state.income = action.payload;
        }
    }
});

export default CurrencySlice.reducer;
export const {setCurrencyCode, setIncome}  = CurrencySlice.actions;