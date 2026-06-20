import { useState } from "react";
import {
  usePatientAppointments,
  useCancelAppointment,
} from "@/hooks/useAppointment";
import { FiCalendar, FiClock, FiDollarSign, FiX } from "react-icons/fi";

const STATUS_STYLES = {
  PENDING: "bg-yellow-50 text-yellow-600 border-yellow-200",
  CONFIRMED: "bg-green-50 text-green-600 border-green-200",
  CANCELLED: "bg-red-50 text-red-500 border-red-200",
  COMPLETED: "bg-gray-50 text-gray-500 border-gray-200",
};

const TABS = ["All", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;
type Tab = (typeof TABS)[number];

export default function MyAppointments() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { data: appointments, isLoading, isError } = usePatientAppointments();
  const { mutate: cancel, isPending: isCancelling } = useCancelAppointment();

  const filtered =
    activeTab === "All"
      ? appointments
      : appointments?.filter((a: any) => a.status === activeTab);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Track and manage all your upcoming and past appointments.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 cursor-pointer rounded-xl text-sm font-medium border transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-main text-white border-main"
                : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-main"
            }`}
          >
            {tab === "All" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
            {tab === "All" && (
              <span className="ml-2 bg-indigo-100 text-main/80 text-xs px-2 py-0.5 rounded-full">
                {appointments?.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 rounded-2xl h-32"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-center text-gray-400 py-20">
          Something went wrong. Please try again.
        </p>
      )}

      {!isLoading && !isError && filtered?.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <FiCalendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No appointments found.</p>
          <p className="text-gray-300 text-sm mt-1">
            {activeTab === "All"
              ? "You haven't booked any appointments yet."
              : `No ${activeTab.toLowerCase()} appointments.`}
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((apt: any) => (
            <div
              key={apt.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  src={apt.doctorImage}
                  alt={apt.doctorName}
                  className="w-16 h-16 rounded-2xl object-cover bg-indigo-50 shrink-0"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {apt.doctorName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {apt.specialization}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full border shrink-0 ${
                        STATUS_STYLES[apt.status as keyof typeof STATUS_STYLES]
                      }`}
                    >
                      {apt.status.charAt(0) + apt.status.slice(1).toLowerCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="w-4 h-4 text-indigo-400" />
                      {new Date(apt.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiClock className="w-4 h-4 text-indigo-400" />
                      {new Date(apt.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiDollarSign className="w-4 h-4 text-indigo-400" />
                      {apt.fees} DA
                    </span>
                  </div>
                </div>
              </div>

              {(apt.status === "PENDING" || apt.status === "CONFIRMED") && (
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                  <button
                    onClick={() => cancel(apt.id)}
                    disabled={isCancelling}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 px-4 py-2 rounded-xl transition-all hover:bg-red-50 disabled:opacity-50 cursor-pointer"
                  >
                    <FiX className="w-4 h-4" />
                    Cancel Appointment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
