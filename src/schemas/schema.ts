import { z } from "zod";

export const RequiredString = z.string().min(1);
export const RequiredPassword = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");
export const RequiredLat = z.string()
    .trim()
    .regex(/^-?\d{1,3}(\.\d+)?$/, {
        message: "Latitude must be a number (e.g., '16.8409' or '-90.0')",
    })
    .transform(Number) // Convert to number
    .pipe(
        z.number()
            .min(-90, { message: "Latitude cannot be less than -90" })
            .max(90, { message: "Latitude cannot be greater than 90" })
    );
export const RequiredLon = z.string()
    .trim()
    .regex(/^-?\d{1,3}(\.\d+)?$/, {
        message: "Longitude must be a number (e.g., '96.1735' or '-180.0')",
    })
    .transform(Number) // Convert to number
    .pipe(
        z.number()
            .min(-180, { message: "Longitude cannot be less than -180" })
            .max(180, { message: "Longitude cannot be greater than 180" })
    );