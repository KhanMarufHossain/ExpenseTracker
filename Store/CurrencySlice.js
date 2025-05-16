import {createSlice} from '@reduxjs/toolkit'

const CurrencySlice= createSlice({
    name: "currency",
    initialState: {
        code: 'USD',
        addmoney : 0,
        balance : 0,
        
    },
    reducers: 
    {
        setCurrencyCode: (state, action)=>{
            state.code = action.payload;
        },
        addmoney: (state, action)=> {
            state.addmoney = action.payload;
        }, 
        setBalance: ()=>{
            state.balance = action.payload;
        }
    }
});

export default CurrencySlice.reducer;
export const {setCurrencyCode, addmoney, setBalance}  = CurrencySlice.actions;