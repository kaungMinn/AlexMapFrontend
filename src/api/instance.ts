import axios from "axios";

export const instanceForJSON = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_SERVER_URL,
   
    headers: {
        "Content-Type" : "application/json",
    }
});

export const generalInstance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_SERVER_URL,
   
    headers: {
        "Content-Type" : "application/json",
    }
});

export const instanceForMultipart = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_SERVER_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});