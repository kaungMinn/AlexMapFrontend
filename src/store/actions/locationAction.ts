import { LocationService } from "@/services/locationService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ValidationError } from "./authAction";
import error_helper from "@/utils/errorHelper";
import { LocationFormInput } from "@/types/_locationTypes";

export type LocationDetails = {
  _id: string;
  name: string;
  displayName: string;
  desc: string;
  lat: string | number;
  lon: string | number;
  image: string;
  user?: {
    displayName: string;
    _id: string;
  }
}

export type GetAllLocationsResponseType = {details: LocationDetails[], message: string; success: boolean};
export type GetLocationResponseType = {details: LocationDetails, message: string; success: boolean};
export type InstallLocationResponseType = {details: LocationDetails, message: string; success: boolean;}
export type UpdateLocationResponseType = {details: LocationDetails, message: string; success: boolean;}

export const getALlLocations = createAsyncThunk<GetAllLocationsResponseType, void, {
  rejectValue: AxiosResponse<ValidationError>;
}
>(
  "location/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LocationService.getAll();
      return response.data;
    } catch (error: unknown) {
      const validationError = error_helper.check(error);
      if(validationError){
        return rejectWithValue(validationError)
      }
      throw error;
    }
  }
);

export const getLocation = createAsyncThunk<GetLocationResponseType, string, {
  rejectValue: AxiosResponse<ValidationError>;
}
>(
  "location/get",
  async (nodeId, { rejectWithValue }) => {
    try {
      const response = await LocationService.get(nodeId);
      return response.data;
    } catch (error: unknown) {
      const validationError = error_helper.check(error);
      if(validationError){
        return rejectWithValue(validationError)
      }
      throw error;
    }
  }
);


export const installLocation = createAsyncThunk<InstallLocationResponseType, LocationFormInput, {
    rejectValue: AxiosResponse<ValidationError>; // rejectWithValue payload
  }
>(
    "location/installation",
    async (locationData : LocationFormInput, { rejectWithValue }) => {
      try {
        const response = await LocationService.create(locationData);
        return response.data;
      } catch (error: unknown) {
        const validationError = error_helper.check(error);
        if(validationError){
          return rejectWithValue(validationError)
        }
        throw error;
      }
    }
  );

  export const updateLocation = createAsyncThunk<UpdateLocationResponseType, LocationFormInput, {
    rejectValue: AxiosResponse<ValidationError>; // rejectWithValue payload
  }
>(
    "location/update",
    async (locationData : LocationFormInput, { rejectWithValue }) => {
      try {
        const response = await LocationService.update(locationData);
        return response.data;
      } catch (error: unknown) {
        const validationError = error_helper.check(error);
        if(validationError){
          return rejectWithValue(validationError)
        }
        throw error;
      }
    }
  );
