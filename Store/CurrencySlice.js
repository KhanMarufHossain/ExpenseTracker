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
        
        incometrack : [],
        expensetrack: [],
        
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
        updateIncomeTrack: (state, action)=>{
            state.incometrack = [...state.incometrack, action.payload]
        },
        updateExpenseTrack : (state, action)=>{
            state.expensetrack = [...state.expensetrack,action.payload]
        }
        
    }
});

export default CurrencySlice.reducer;
export const {setCurrencyCode, setIncome, setExpense, updateIncomeTrack,updateExpenseTrack}  = CurrencySlice.actions;