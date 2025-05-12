import { createSlice } from "@reduxjs/toolkit";
import { getALlLocations, installLocation, LocationDetails, updateLocation } from "../actions/locationAction";

type InitialState = {
    message: string;
    locationDetails: LocationDetails;
    allLocations: LocationDetails[];
}

const LOCATION_DETAILS:LocationDetails =  {
    name: "",
    displayName: "",
    lat: "",
    lon: "",
    desc: "",
    image: "",
    _id: ""
};

const INITIAL_STATE:InitialState = {
    message: "",
    locationDetails : LOCATION_DETAILS,
    allLocations: [],
}
const locationSlice = createSlice({
    name: "location",
    initialState: {data: INITIAL_STATE , isLoading: false, isSuccess: false},
    reducers: {
        resetLocation: (state) => {
            state.data = INITIAL_STATE;
            state.isSuccess = false;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(installLocation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(installLocation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data.message = action.payload.message;
            state.data.locationDetails = action.payload.details;
        });
        builder.addCase(installLocation.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        });

        builder.addCase(getALlLocations.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getALlLocations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data.message = action.payload.message;
            state.data.allLocations = action.payload.details;
            state.isSuccess = false;
        });
        builder.addCase(getALlLocations.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        });

        builder.addCase(updateLocation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateLocation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data.message = action.payload.message;
            state.data.locationDetails = action.payload.details;
        });
        builder.addCase(updateLocation.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        })
    }
});

export const {resetLocation } = locationSlice.actions;
export default locationSlice;