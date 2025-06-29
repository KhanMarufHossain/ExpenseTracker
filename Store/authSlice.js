import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice(
    {
        name: "auth",
        initialState: {
            user : null,
            loading: false,
            error: null,
        
        },

        reducers: {
            setUser (state, action){
                state.user = action.payload;
                state.error = null;
            },
            setLoading(state,action)
            {
                state.loading= action.payload;
            },
            setError (state, action)
            {
                state.error = action.payload;
            },
            logout (state){
                state.user = null;
                state.error = null;
            }

        }
    }
);

export const {setUser, setLoading, setError, logout}= authSlice.actions;
export default authSlice.reducer;