import { ACCESS_TOKEN, ROLE_ID, SITE_URL } from "@/constants/storage";
import { AuthService } from "@/services/authService";
import error_helper from "@/utils/errorHelper";
import { setCookie, setLocalStorage } from "@/utils/storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

type PostLoginType = {
    name: string;
    password: string;
  };
  export type ValidationError = {
    message: string;
    errors: Record<string, string[]>;
  };
  
  
  export const postLogin = createAsyncThunk<void, PostLoginType, {
    rejectValue: AxiosResponse<ValidationError>; // rejectWithValue payload
  }
>(
    "auth/login",
    async ({ name, password }: PostLoginType, { rejectWithValue }) => {
      try {
        const response = await AuthService.login(name, password);
        const access_token: string = response.data.details.accessToken;
  
        const data: {
          userInfo: { username: string; roles: number[] };
          exp: number;
          iat: number;
        } = jwtDecode(access_token);
        const protocol: string = window.location.protocol;
        const host: string = window.location.host;
  
        setLocalStorage(SITE_URL, `${protocol}//${host}`);
        setLocalStorage(ROLE_ID, data.userInfo.roles[0].toString());
  
        setCookie(ACCESS_TOKEN, access_token);
      } catch (error: unknown) {
        const validationError = error_helper.check(error);
        if(validationError){
          return rejectWithValue(validationError)
        }
        throw error;
      }
    }
  );
  