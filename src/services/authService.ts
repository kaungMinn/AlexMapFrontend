import { LoginFormTypes, RegisterFormTypes } from "@/types/_authTypes";
import { generalInstance } from "../api/instance";
import { getApiInstanceForJSON } from "./api";

const login = async (payload: LoginFormTypes) => {
    const response = await getApiInstanceForJSON().post('/auth/login', payload);
    return response;
}   

const logout = async () => {
    const response = await getApiInstanceForJSON().get('/auth/logout')
    return response;
}

const register = async (payload: RegisterFormTypes) => {
    const response = await getApiInstanceForJSON().post('/auth/register', payload);
    return response;
}

const refreshTheToken = async () => {
    try {
        const response = await generalInstance.get('/auth/refresh');
        return response;
    } catch (error) {
        console.error("Token refresh failed:", error);
        throw error; 
    }
}


export const AuthService = {refreshTheToken, login, logout, register};