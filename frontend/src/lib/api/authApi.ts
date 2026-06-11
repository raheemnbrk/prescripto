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

export const getUser = async () => {
  const res = await api.get("/auth/getMe");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const refresh = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};
