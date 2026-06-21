import { useQuery } from "@tanstack/react-query";
import { FiCalendar, FiUsers, FiTrendingUp, FiClock } from "react-icons/fi";
import api from "@/lib/axios";
import { useDoctorAppointments } from "@/hooks/useAppointment";

const useDoctorStats = () =>
  useQuery({
    queryKey: ["doctor-stats"],
    queryFn: async () => {
      const res = await api.get("/doctor/stats");
      return res.data.stats;
    },
  });

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDoctorStats();
  const { data, isLoading: aptsLoading } = useDoctorAppointments({
    page: 1,
    limit: 5,
    date: new Date().toISOString().split("T")[0],
  });

  const cards = [
    {
      label: "Total Appointments",
      value: stats?.totalAppointments,
      icon: <FiCalendar />,
    },
    {
      label: "Today's Appointments",
      value: stats?.todayAppointments,
      icon: <FiClock />,
    },
    {
      label: "Total Patients",
      value: stats?.totalPatients,
      icon: <FiUsers />,
    },
    {
      label: "Total Revenue",
      value: stats?.totalRevenue ? `${stats.totalRevenue} DA` : "0 DA",
      icon: <FiTrendingUp />,
    },
  ];

  const statusStyle: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700",
    CONFIRMED: "bg-blue-50 text-blue-700",
    CANCELLED: "bg-red-50 text-red-700",
    COMPLETED: "bg-green-50 text-green-700",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back, here's your overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">{card.label}</p>
              <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center text-main">
                {card.icon}
              </div>
            </div>
            {statsLoading ? (
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-800">
                {card.value ?? 0}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Today's Appointments</h3>
        </div>

        {aptsLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : !data?.appointments?.length ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <FiCalendar className="w-8 h-8 mb-2" />
            <p className="text-sm">No appointments today</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.appointments.map((apt: any) => (
              <div
                key={apt.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      apt.patientImage?.trim()
                        ? apt.patientImage
                        : "https://www.gravatar.com/avatar/?d=mp"
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {apt.patientName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(apt.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[apt.status]}`}
                  >
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}