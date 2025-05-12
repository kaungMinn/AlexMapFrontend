import { generalInstance } from "../api/instance";
import { getApiInstanceForJSON } from "./api";

const login = async (name: string, password: string) => {
    const response = await getApiInstanceForJSON().post('/auth/login', {name, password});
    return response;
}   

const logout = async () => {
    const response = await getApiInstanceForJSON().get('/auth/logout')
    return response;
}

const register = async () => {
    const response = await getApiInstanceForJSON().get('/auth/register');
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