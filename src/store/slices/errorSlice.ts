import { createSlice } from "@reduxjs/toolkit";
import { postLogin, register } from "../actions/authAction";
import { getALlLocations, getLocation, installLocation, updateLocation } from "../actions/locationAction";

type DefaultInitialStateType = {
  isError: boolean;
  statusCode: number;
  errorMessage: string;
};

const DEFAULT_INITIAL_STATE: DefaultInitialStateType = {
  isError: false,
  statusCode: 0,
  errorMessage: "",
};


const errorSlice = createSlice({
  name: "error",
  initialState: DEFAULT_INITIAL_STATE,
  reducers: {
    resetError: (state) => {
      state.isError = DEFAULT_INITIAL_STATE.isError;
      state.statusCode = DEFAULT_INITIAL_STATE.statusCode;
      state.errorMessage = DEFAULT_INITIAL_STATE.errorMessage;
    },
  },
  extraReducers: (builder) => {
    /* AUTH */
    //Login
    builder.addCase(postLogin.rejected, (state, action) => {
        state.isError = true;
        if (action.payload) {
            state.statusCode = action.payload.status;
            state.errorMessage = action.payload.data.message;
          } else {
            state.statusCode = 500;
            state.errorMessage = "An unexpected error occurred.";
          }
    });
    //register
    builder.addCase(register.rejected, (state, action) => {
      state.isError = true;
      if (action.payload) {
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data.message;
        } else {
          state.statusCode = 500;
          state.errorMessage = "An unexpected error occurred.";
        }
    });


    /* LOCATION NODES */
    //Get all
    builder.addCase(getALlLocations.rejected, (state, action) => {
      state.isError = true;
      if (action.payload) {
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data.message;
      } else {
        state.statusCode = 500;
        state.errorMessage = "An unexpected error occurred.";
      }
    });
    //Get
    builder.addCase(getLocation.rejected, (state, action) => {
      state.isError = true;
      if (action.payload) {
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data.message;
      } else {
        state.statusCode = 500;
        state.errorMessage = "An unexpected error occurred.";
      }
    });
    //Install
    builder.addCase(installLocation.rejected, (state, action) => {
      state.isError = true;
      if (action.payload) {
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data.message;
      } else {
        state.statusCode = 500;
        state.errorMessage = "An unexpected error occurred.";
      }
    });
    //Update
    builder.addCase(updateLocation.rejected, (state, action) => {
      state.isError = true;
      if (action.payload) {
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data.message;
      } else {
        state.statusCode = 500;
        state.errorMessage = "An unexpected error occurred.";
      }
    });

  },
});

export const { resetError } = errorSlice.actions;
export default errorSlice;
