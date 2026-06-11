import { Navigate, Outlet } from "react-router-dom";
import LoadingDots from "../components/loadingDots";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoutes() {
  const { user, loading } = useAuthStore();
  if (loading) return <LoadingDots />;
  if (!user) return <Navigate to={"/login"} replace />;
  return <Outlet />;
}
