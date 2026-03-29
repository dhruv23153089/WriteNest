import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    userData: null,
    token: null,
    error: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { 
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.token = action.payload.token;
            state.error = null;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.token = null;
            state.error = null;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;