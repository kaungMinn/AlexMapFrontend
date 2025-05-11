import { z } from "zod";

export const form = z.object({
  name: z.string().min(1).max(100),
  desc: z.string().max(500).optional(),
  lat: z.union([
    z.string()
      .trim()
      .regex(/^-?\d{1,3}(\.\d+)?$/)
      .transform(Number)
      .pipe(z.number().min(-90).max(90)),
    z.number().min(-90).max(90)
  ]),
  lon: z.union([
    z.string()
      .trim()
      .regex(/^-?\d{1,3}(\.\d+)?$/)
      .transform(Number)
      .pipe(z.number().min(-180).max(180)),
    z.number().min(-180).max(180)
  ])
});


export const LocationSchema = {form}