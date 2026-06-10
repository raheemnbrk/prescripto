import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function GuestRouter() {
  const { user } = useAuthStore();
  if (user) return <Navigate to={"/"} replace />;
  else return <Outlet />;
}
