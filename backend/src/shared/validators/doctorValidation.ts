import z from "zod";
import { registerSchema, updateProfileSchema } from "./authValidation";

export const createDoctorSchema = registerSchema.extend({
  specialization: z.string().min(1, "Specialization is required."),
  experience: z.coerce
    .number()
    .int()
    .min(0, "Experience must be a positive number."),
  fees: z.coerce.number().min(0, "Fees must be a positive number."),
  about: z.string().min(10, "About must be at least 10 characters."),
  degree: z.string().min(1, "Degree is required."),
  address: z.string().min(1, "Address is required."),
});

export const updateDoctorSchema = updateProfileSchema.extend({
  specialization: z.string().min(1, "Specialization is required.").optional(),
  experience: z.coerce
    .number()
    .int()
    .min(0, "Experience must be a positive number.")
    .optional(),
  fees: z.coerce.number().min(0, "Fees must be a positive number.").optional(),
  about: z.string().min(10, "About must be at least 10 characters.").optional(),
  degree: z.string().min(1, "Degree is required.").optional(),
  address: z.string().min(1, "Address is required.").optional(),
  available: z.boolean().optional(),
});
