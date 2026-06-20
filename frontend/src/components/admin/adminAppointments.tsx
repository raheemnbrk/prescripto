import { useAdminAppointments } from "@/hooks/useAdmin";
import { FiChevronRight, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Appointment } from "@/types/appointments";

const statusStyle: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-blue-50 text-blue-700",
  CANCELLED: "bg-red-50 text-red-700",
  COMPLETED: "bg-green-50 text-green-700",
};

export default function AdminAppointments() {
  const { data, isLoading } = useAdminAppointments({ page: 1, limit: 5 });
  const appointments = data?.appointments;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Appointments</h3>
        <Link to="/admin/appointments">
          <button className="flex items-center gap-1 text-sm text-main hover:underline cursor-pointer">
            View all <FiChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : !appointments?.length ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <FiCalendar className="w-8 h-8 mb-2" />
          <p className="text-sm">No appointments yet</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {appointments.map((apt: Appointment) => (
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
                  <p className="text-xs text-gray-400">Dr. {apt.doctorName}</p>
                  <p className="text-xs text-gray-400">{apt.specialization}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs text-gray-400">
                  {new Date(apt.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
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
  );
}
