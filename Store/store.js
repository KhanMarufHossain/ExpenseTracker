import CurrencyReducer from './CurrencySlice.js'
import { configureStore } from '@reduxjs/toolkit'
import { persistenceMiddleware } from './persistenceMiddleware.js'
import authReducer from './authSlice.js';
export const Store = configureStore({
    reducer: {
        Currency: CurrencyReducer,
        auth : authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(persistenceMiddleware)
});

