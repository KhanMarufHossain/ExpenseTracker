import {createSlice} from '@reduxjs/toolkit'

const CurrencySlice= createSlice({
    name: "currency",
    initialState: {
        code: 'USD',
        income : {
            number: 0, 
        },
        expense : {
            number: 0, 
        }, 
        transactiontrack : [],
    },
    reducers: 
    {
        setCurrencyCode: (state, action)=>{
            state.code = action.payload;
        },
         setIncome: (state, action)=>{
            state.income.number = parseFloat(action.payload.number);
        }, 
        
        setExpense: (state, action)=>{
           state.expense.number = parseFloat(action.payload.number);
        },
        
        updateTransactionTrack: (state, action)=>{
            state.transactiontrack = [...state.transactiontrack, action.payload];
        },
        
        clearTransactions: (state) => {
            state.transactiontrack = [];
        }
    }
});

export default CurrencySlice.reducer;
export const {setCurrencyCode, setIncome, setExpense, updateTransactionTrack, clearTransactions} = CurrencySlice.actions;