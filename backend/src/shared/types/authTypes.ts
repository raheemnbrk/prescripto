import { Role, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validators/authValidation";
import z from "zod";
import { createDoctorSchema } from "../validators/doctorValidation";

export interface payload extends JwtPayload {
  id: string;
  role: Role;
}

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;

export type doctorInput = z.infer<typeof createDoctorSchema>;

export interface authServiceReturn {
  accessToken: string;
  refreshToken: string;
  user: User;
}
