import SideBar from "@/components/admin/sidebar";
import TopBar from "@/components/admin/topBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}