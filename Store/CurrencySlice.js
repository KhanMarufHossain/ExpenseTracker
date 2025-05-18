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
       
        setIncome: (state, action )=>{
            state.income.number = action.payload.number;
            
        }, 
        
        setExpense : (state, action)=>{
           state.expense.number = action.payload.number;
           
        },
        
        updateTransactionTrack: (state, action)=>{
            state.transactiontrack= [...state.transactiontrack, action.payload];
        }
        
    }
});

export default CurrencySlice.reducer;
export const {setCurrencyCode, setIncome, setExpense, updateTransactionTrack}  = CurrencySlice.actions;