import { Role, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validators/authValidation";
import z from "zod";

export interface payload extends JwtPayload {
  id: string;
  role: Role;
}

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;

export interface authServiceReturn {
  accessToken: string;
  refreshToken: string;
  user: User;
}

