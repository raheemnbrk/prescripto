import { create } from "zustand";
import type { authStore } from "../types/authTypes";

export const useAuthStore = create<authStore>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, accessToken) => set({ user, accessToken }),
  logout: () => set({ user: null, accessToken: null }),
}));
