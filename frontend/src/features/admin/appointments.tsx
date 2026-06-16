import AppointmentFilters from "@/components/admin/appointmentsFilter";
import AppPagination from "@/components/admin/pagination";
import { DataTable } from "@/components/admin/table";
import { DatePickerInput } from "@/components/layout/datePicker";
import TableSkeleton from "@/components/loading/tableSkeleton";
import { useAdminAppointments } from "@/hooks/useAdmin";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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
    if (!searchParams.get("page")) {
      setSearchParams({ page: "1" }, { replace: true });
    }
  }, []);

  const { isLoading, data } = useAdminAppointments({
    page,
    search,
    searchBy,
    status,
    range,
    date,
  });

  const columns = [
    { label: "Doctor", key: "doctorName" },
    { label: "User", key: "userName" },
    { label: "Date", key: "date" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="flex flex-col space-y-5">
      <DatePickerInput
        value={date}
        onChange={(d) => {
          const params = new URLSearchParams(searchParams);

          if (!d) {
            params.delete("date");
          } else {
            params.set("date", d.toISOString().split("T")[0]);
          }

          params.set("page", "1");
          setSearchParams(params);
        }}
      />
      <h1 className="text-2xl font-bold">All Appointments</h1>

      <AppointmentFilters />

      {isLoading ? (
        <TableSkeleton rows={6} columns={4} />
      ) : (
        <div className="flex flex-col space-y-3">
          <DataTable data={data?.appointments || []} columns={columns} />

          <AppPagination page={page} totalPages={data?.totalPages || 1} />
        </div>
      )}
    </div>
  );
}
