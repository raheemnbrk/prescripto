import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { role } from "../types/authTypes";
import LoadingDots from "../components/loadingDots";

export default function RoleRouter({ role }: { role: role }) {
  const { user, loading } = useAuthStore();
  if (loading) return <LoadingDots />;
  if (!user) return <Navigate to="/login" replace />;
  if (user?.role !== role) return <Navigate to={"/"} replace />;
  return <Outlet />;
}
