import {createSlice} from '@reduxjs/toolkit'

const CurrencySlice= createSlice({
    name: "currency",
    initialState: {
        code: 'USD',
        income : {
            number: 0, message: ''
        },
        expense : {
            number: 0, message: ''
        }, 
        
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
        }
    }
});

export default CurrencySlice.reducer;
export const {setCurrencyCode, setIncome, setExpense}  = CurrencySlice.actions;