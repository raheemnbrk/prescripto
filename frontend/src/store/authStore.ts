import { create } from "zustand";
import type { authStore } from "../types/authTypes";

export const useAuthStore = create<authStore>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user, accessToken) => set({ user, accessToken }),
  setAccessToken: (token) => set({ accessToken: token }),
  clearAuth: () => set({ user: null, accessToken: null }),
  loading: true,
  setLoading: (val) => set({ loading: val }),
  setUser: (user) => set({ user: user }),
}));
