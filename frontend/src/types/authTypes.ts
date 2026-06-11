import z from "zod";
import type { LoginSchema, registerSchema } from "../validation/authValidation";

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
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
}

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof LoginSchema>;

export type role = "ADMIN" | "DOCTOR" | "PATIENT";
