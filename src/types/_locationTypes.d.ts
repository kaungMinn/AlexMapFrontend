import { LocationSchema } from "@/schemas/locationSchema";
import { z } from "zod";

export type LocationFormInput = z.input<typeof LocationSchema.form>;
export type LocationFormOutput = z.output<typeof LocationSchema.form>;


//ACTIONS
export type LocationDetails = {
    _id: string;
    name: string;
    displayName: string;
    desc: string;
    lat: string | number;
    lon: string | number;
    image: string;
    user?: {
      displayName: string;
      _id: string;
    }
  }
  