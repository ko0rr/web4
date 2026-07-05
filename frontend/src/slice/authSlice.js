import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        loginUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = { username: action.payload.username };
            state.isAuthenticated = true;
            localStorage.setItem('accessToken', action.payload.accessToken);
        },

        logoutUser: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        },

        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
        }
    },
});

export const { loginUser, logoutUser, updateAccessToken } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;