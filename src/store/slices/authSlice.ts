import { createSlice } from "@reduxjs/toolkit"
import { postLogin } from "../actions/authAction"

const authSlice = createSlice({
    name: "auths",
    initialState: {data: {}, isLoading: false, isSuccess: false},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(postLogin.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        });
        builder.addCase(postLogin.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default authSlice