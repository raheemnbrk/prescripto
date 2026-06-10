import type { RegisterInput, LoginInput } from "../../types/authTypes";
import api from "../axios";

export const register = async (data: RegisterInput) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginInput) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
