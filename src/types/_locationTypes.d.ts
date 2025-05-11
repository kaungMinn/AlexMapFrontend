import { LocationSchema } from "@/schemas/locationSchema";
import { z } from "zod";

export type LocationFormInput = z.input<typeof LocationSchema.form>;
export type LocationFormOutput = z.output<typeof LocationSchema.form>;
