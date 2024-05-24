import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAuth: {
        status: localStorage.getItem("loginStatus") || false,
        userInfo: null,
    }
};

export const AuthSlice = createSlice( {
    name: "auth",
    initialState,
    reducers: {
        login: ( state, action ) => {
            localStorage.setItem( "loginStatus", true );
            state.userAuth.status = true;
            state.userAuth.userInfo = action.payload
        },
        logout: ( state, action ) => {
            state.userAuth.status = false;
            state.userAuth.userInfo = null;
            localStorage.removeItem("loginStatus");
        }
    }
} )

export const { login, logout } = AuthSlice.actions;

export const AuthReducer = AuthSlice.reducer