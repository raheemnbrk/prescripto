import SideBar from "@/components/admin/sidebar";
import TopBar from "@/components/admin/topBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}