import { z } from "zod";
import { RequiredPassword, RequiredString } from "./schema";

const register = z.object({
    name: RequiredString,
    password: RequiredPassword,
    confirmedPassword: RequiredPassword,
}).refine(
    (data) => data.password === data.confirmedPassword,
    {
      message: "Passwords don't match",
      path: ["confirmedPassword"] // This shows the error on confirmedPassword field
    }
);

const login = z.object({
    name: RequiredString,
    password: RequiredPassword
});
  
  
export const AuthSchema = {register, login}