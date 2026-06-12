import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoutes() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to={"/login"} replace />;
  return <Outlet />;
}
