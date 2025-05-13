import { createSlice } from "@reduxjs/toolkit"
import { postLogin, register } from "../actions/authAction"
import { RegisterFormTypes } from "@/types/_authTypes";
import { AUTH_CONSTANTS } from "@/constants/authConstants";

type InitialState = {
    message: string;
    registerDetails: RegisterFormTypes,
}

const INITIAL_STATE: InitialState  = {
    message: "",
    registerDetails: AUTH_CONSTANTS.register
}

const authSlice = createSlice({
    name: "auths",
    initialState: {data: INITIAL_STATE, isLoading: false, isSuccess: false},
    reducers: {
        resetAuth: (state) => {
            state.data = INITIAL_STATE;
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
    extraReducers: (builder) => {
        //Login
        builder.addCase(postLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(postLogin.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(postLogin.rejected, (state) => {
            state.isLoading = false;
        });

        //Register
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = true;
            state.isSuccess = true;
            state.data.message = action.payload.message;
            state.data.registerDetails = action.payload.details;

        });
        builder.addCase(register.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        })
    }
})

export const {resetAuth} = authSlice.actions;
export default authSlice