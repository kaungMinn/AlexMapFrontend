import { z } from "zod";

export const form = z.object({
  _id: z.string().optional(),
  displayName: z.string().min(1,{message: "Name cannot be empty"}).max(100),
  name: z.string().optional(),
  desc: z.string().max(500).optional(),
  image: z.any().optional(),
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
}).transform((data) => {
  const name = data.displayName
    .toLowerCase()  
    .replace(/\s+/g, ''); 
  
  return {
    ...data,
    name
  };
});



export const LocationSchema = {form}