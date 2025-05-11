import { LoginFormTypes, RegisterFormTypes } from "@/types/_authTypes";

const register :RegisterFormTypes = {
    name: "",
    password: "",
    confirmedPassword: ""
}

const login: LoginFormTypes = {
    name: "",
    password: ""
}

export const AUTH_CONSTANTS = {register, login}