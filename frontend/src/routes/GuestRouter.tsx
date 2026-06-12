import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoadingDots from "../components/loadingDots";

export default function GuestRouter() {
  const { user, loading } = useAuthStore();
  if (loading) return <LoadingDots />;
  if (user) return <Navigate to={"/"} replace />;
  else return <Outlet />;
}
