import { LocationFormInput } from "@/types/_locationTypes";
import {getApiInstanceForJSON, getApiInstanceForMultipart } from "./api"


const getAll = async() => {
    const response = await getApiInstanceForJSON().get('/node');
    return response;
}

const create = async (locationData: LocationFormInput) => {
    const response = await getApiInstanceForMultipart().post('/node', locationData);
    return response;
}

const update = async (locationData: LocationFormInput) => {
    const response = await getApiInstanceForMultipart().put('/node', locationData);
    return response;
}

export const LocationService = {create, getAll, update}