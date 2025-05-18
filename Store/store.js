import CurrencyReducer from './CurrencySlice.js'
import { configureStore } from '@reduxjs/toolkit'
import { persistenceMiddleware } from './persistenceMiddleware.js'

export const Store = configureStore({
    reducer: {
        Currency: CurrencyReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(persistenceMiddleware)
});

