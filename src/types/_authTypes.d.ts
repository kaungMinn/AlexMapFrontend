import { AuthSchema } from "@/schemas/authSchema";
import { z } from "zod";

export type LoginFormTypes = z.infer<typeof AuthSchema.login>;
export type RegisterFormTypes = z.infer<typeof AuthSchema.register>;