import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "@/utils/storage";
import { ACCESS_TOKEN } from "@/constants/storage";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "./authService";
import { instanceForJSON, instanceForMultipart } from "@/api/instance";


type UserInformationType = {
  userId: number;
  fullName: string;
  email: string;
  deptId: number;
  roleId: number;
  iat: number;
  exp: number;
}

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const accessToken = getCookie(ACCESS_TOKEN);

  if (!accessToken) {
    return config;
  }

  const user: UserInformationType = jwtDecode(accessToken);
  const isExpired = user.exp * 1000 < new Date().getTime();

  if (isExpired) {
    const response = await AuthService.refreshTheToken();
    const accessToken = response?.data.details.accessToken;
    setCookie(ACCESS_TOKEN, accessToken);
    config.headers!.Authorization = `Bearer ${accessToken}`;
    return config;
  }
  config.headers!.Authorization = `Bearer ${accessToken}`;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}


export const getApiInstanceForJSON = () => {
  instanceForJSON.interceptors.request.use(onRequest, onRequestError);
  instanceForJSON.interceptors.response.use(onResponse, onResponseError);

  return instanceForJSON;
}

export const getApiInstanceForMultipart = () => {
  instanceForMultipart.interceptors.request.use(onRequest, onRequestError);
  instanceForMultipart.interceptors.response.use(onResponse, onResponseError)
  return instanceForMultipart;
}