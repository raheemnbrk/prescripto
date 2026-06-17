import type { User } from "@/types/authTypes";
import api from "../axios";

export const getMe = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data.user;
};