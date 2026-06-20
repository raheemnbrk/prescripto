import AdminAppointments from "@/components/admin/adminAppointments";
import AdminDoctors from "@/components/admin/adminDoctors";
import StatsCards from "@/components/layout/statsCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of your platform</p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminDoctors />
        <AdminAppointments />
      </div>
    </div>
  );
}
