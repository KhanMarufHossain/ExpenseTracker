import CurrencyReducer from './CurrencySlice.js'
import { configureStore } from '@reduxjs/toolkit'

export const Store= configureStore({
    reducer: {
        Currency: CurrencyReducer,
        
    }

});

