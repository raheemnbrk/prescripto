import { Outlet } from "react-router-dom";
import LoadingDots from "../components/loadingDots";
import { useAuthStore } from "../store/authStore";

export default function PublicRoutes() {
  const { loading } = useAuthStore();
  if (loading) return <LoadingDots />;
  return <Outlet />;
}
