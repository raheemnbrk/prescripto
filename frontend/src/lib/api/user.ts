import type { User } from "@/types/authTypes";
import api from "../axios";

export const getMe = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

export const updateProfile = async (data: FormData): Promise<User> => {
  const res = await api.post("/auth/update-profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.user;
};
