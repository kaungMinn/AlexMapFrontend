import { createSlice } from "@reduxjs/toolkit";
import { getALlLocations, getLocation, installLocation, updateLocation } from "../actions/locationAction";
import { LocationDetails } from "@/types/_locationTypes";

type InitialState = {
    message: string;
    action: string;
    locationDetails: LocationDetails;
    allLocations: LocationDetails[];
    location: LocationDetails,
}

const LOCATION_DETAILS: LocationDetails = {
    name: "",
    displayName: "",
    lat: "",
    lon: "",
    desc: "",
    image: "",
    _id: ""
};

const INITIAL_STATE: InitialState = {
    message: "",
    action: "",
    locationDetails: LOCATION_DETAILS,
    location: LOCATION_DETAILS,
    allLocations: [],
}
const locationSlice = createSlice({
    name: "location",
    initialState: { data: INITIAL_STATE, isLoading: false, isSuccess: false },
    reducers: {
        resetLocation: (state) => {
            state.data = INITIAL_STATE;
            state.isSuccess = false;
            state.isLoading = false;
        },
        resetLocationSoft: (state) => {
            state.isSuccess = false;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {

        //Get All
        builder.addCase(getALlLocations.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getALlLocations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data.message = action.payload.message;
            state.data.allLocations = action.payload.details;
            state.data.action = "getAll"
            state.isSuccess = false;
        });

        builder.addCase(getALlLocations.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        });

        //Get
        builder.addCase(getLocation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getLocation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data.message = action.payload.message;
            state.data.location = action.payload.details;
            state.data.action = "get"
        });
        builder.addCase(getLocation.rejected, (state) => {
            state.isLoading = false;
        })

        //Install
        builder.addCase(installLocation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(installLocation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data.message = action.payload.message;
            state.data.locationDetails = action.payload.details;
            state.data.action = "install"
        });
        builder.addCase(installLocation.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        });

        //Update
        builder.addCase(updateLocation.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(updateLocation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data.message = action.payload.message;
            state.data.locationDetails = action.payload.details;
            state.data.action = "update"
        });
        builder.addCase(updateLocation.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        });

  
    }
});

export const { resetLocation, resetLocationSoft } = locationSlice.actions;
export default locationSlice;