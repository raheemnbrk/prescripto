import AppointmentFilters from "@/components/admin/appointmentsFilter";
import AppPagination from "@/components/admin/pagination";
import { DataTable } from "@/components/admin/table";
import { DatePickerInput } from "@/components/layout/datePicker";
import TableSkeleton from "@/components/loading/tableSkeleton";
import {
  useAdminAppointments,
  useAdminCancelAppointment,
} from "@/hooks/useAdmin";
import type { Appointment } from "@/types/appointments";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Column } from "@/components/admin/table";

const statusStyle: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-blue-50 text-blue-700",
  CANCELLED: "bg-red-50 text-red-700",
  COMPLETED: "bg-green-50 text-green-700",
};

export default function Appointments() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const searchBy = searchParams.get("searchBy") as
    | "doctor"
    | "user"
    | undefined;
  const status = searchParams.get("status") || undefined;
  const range = searchParams.get("range") as
    | "last7days"
    | "last30days"
    | "last12months"
    | "all"
    | undefined;
  const date = searchParams.get("date") || undefined;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let changed = false;
    if (!params.get("page")) {
      params.set("page", "1");
      changed = true;
    }
    if (changed) setSearchParams(params, { replace: true });
  }, []);

  const { isLoading, data } = useAdminAppointments({
    page,
    search,
    searchBy,
    status,
    range,
    date,
  });
  const cancel = useAdminCancelAppointment();

  const columns: Column<Appointment>[] = [
    {
      label: "Patient",
      key: "patientName",
      render: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={
              row.patientImage?.trim()
                ? row.patientImage
                : "https://www.gravatar.com/avatar/?d=mp"
            }
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-800">{row.patientName}</span>
        </div>
      ),
    },
    {
      label: "Doctor",
      key: "doctorName",
      render: (row) => (
        <div className="flex items-center gap-2 mx-12 md:mx-0">
          <img
            src={
              row.doctorImage?.trim()
                ? row.doctorImage
                : "https://www.gravatar.com/avatar/?d=mp"
            }
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-800">Dr. {row.doctorName}</p>
            <p className="text-xs text-gray-400">{row.specialization}</p>
          </div>
        </div>
      ),
    },
    {
      label: "Date",
      key: "date",
      render: (row) => (
        <span>
          {new Date(row.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}{" "}
          {new Date(row.date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
    {
      label: "Fees",
      key: "fees",
      render: (row) => <span>{row.fees} DA</span>,
    },
    {
      label: "Status",
      key: "status",
      render: (row) => (
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[row.status]}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      label: "Action",
      key: "id",
      render: (row) =>
        row.status === "PENDING" || row.status === "CONFIRMED" ? (
          <button
            onClick={() => cancel.mutate(row.id)}
            disabled={cancel.isPending}
            className="text-xs px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
          >
            Cancel
          </button>
        ) : (
          <span className="text-xs text-gray-300">—</span>
        ),
    },
  ];

  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-2xl font-bold">All Appointments</h1>

      <DatePickerInput
        value={date}
        onChange={(d) => {
          const params = new URLSearchParams(searchParams);
          if (!d) {
            params.delete("date");
          } else {
            const local = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            params.set("date", local);
          }
          params.set("page", "1");
          setSearchParams(params);
        }}
      />

      <AppointmentFilters />

      {isLoading ? (
        <TableSkeleton rows={6} columns={6} />
      ) : (
        <div className="flex flex-col space-y-3">
          <DataTable<Appointment>
            data={data?.appointments || []}
            columns={columns}
            emptyText="No appointments found."
          />
          <AppPagination page={page} totalPages={data?.totalPages || 1} />
        </div>
      )}
    </div>
  );
}
