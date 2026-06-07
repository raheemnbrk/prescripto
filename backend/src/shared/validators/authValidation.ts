import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name should at least contains 3 characters."),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must contains 8 character at least"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must at least contains 8 characters."),
});

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name should at least contains 3 characters."),
  image: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  dob: z.coerce.date().optional(),
  phoneNumber: z
    .string()
    .regex(
      /^(05|06|07)\d{8}$/,
      "Phone number must be a valid Algerian mobile number",
    )
    .optional(),
});
