import { useAdminStats } from "@/hooks/useAdmin";
import CardsSkeleton from "../loading/cardsSkeleton";
import { FiCalendar, FiClock, FiUserCheck, FiUsers } from "react-icons/fi";

interface stats {
  label: string;
  value: number;
  icon: React.ReactElement;
}

export default function StatsCards() {
  const { data, isLoading, isError } = useAdminStats();
  if (isLoading) return <CardsSkeleton />;
  if (isError) return <p>Failed to get stats</p>;

  const cards: stats[] = [
    {
      label: "Total Doctors",
      value: data?.totalDoctors ?? 0,
      icon: <FiUserCheck />,
    },
    { label: "Total Patients", value: data?.totalPatients ?? 0, icon: <FiUsers /> },
    {
      label: "Total Appointments",
      value: data?.totalAppointments ?? 0,
      icon: <FiCalendar />,
    },
    {
      label: "Pending Doctors",
      value: data?.pendingDoctors ?? 0,
      icon: <FiClock />,
    },
  ];

  return (
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
          {isLoading ? (
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-3xl font-bold text-gray-800">
              {card.value ?? 0}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
