import z from "zod";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  dob?: string | null;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  phoneNumber?: string | null;
  gender?: string | null;
  createdAt: string;
}

export interface authStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
}

export const registerSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
