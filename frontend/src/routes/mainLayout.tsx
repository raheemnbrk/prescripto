import NavBar from "@/components/layout/navbar";
import LoadingDots from "@/components/loadingDots";
import { useAuthStore } from "@/store/authStore";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { loading } = useAuthStore();
  if (loading) return <LoadingDots />;
  return (
    <div className="px-4 lg:px-24 py-6 flex flex-col space-y-6">
      <NavBar />
      <Outlet />
    </div>
  );
}
