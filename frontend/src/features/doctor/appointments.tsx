import AppPagination from "@/components/admin/pagination";
import { DataTable } from "@/components/admin/table";
import AppointmentFilters from "@/components/doctors/appointmentsFilter";
import { DatePickerInput } from "@/components/layout/datePicker";
import TableSkeleton from "@/components/loading/tableSkeleton";
import { useDoctorAppointments } from "@/hooks/useAppointment";
import type { DoctorAppointment } from "@/types/doctorType";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { GrCompliance } from "react-icons/gr";

export default function DoctorAppointments() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  const search = searchParams.get("search") || "";

  const status = searchParams.get("status") || undefined;

  const today = new Date().toISOString().split("T")[0];
  const date = searchParams.get("date") || today;

  const { data, isLoading } = useDoctorAppointments({
    search,
    status,
    date,
    page,
    limit: 10,
  });

  const columns = [
    {
      label: "Image",
      key: "patientImage",
      render: (row: DoctorAppointment) => (
        <div className="rounded-full w-fit bg-main/10">
          <img
            src={
              row.patientImage?.trim()
                ? row.patientImage
                : "https://www.gravatar.com/avatar/?d=mp"
            }
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      ),
    },
    { label: "Name", key: "patientName" },
    { label: "Email", key: "email" },
    {
      label: "Phone",
      key: "patientPhone",
      render: (row: DoctorAppointment) => row.patientPhone || "_",
    },
    {
      label: "Date",
      key: "date",
      render: (row: DoctorAppointment) =>
        new Date(row.date).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    { label: "Status", key: "status" },
    {
      label: "Action",
      key: "action",
      render: (row: DoctorAppointment) =>
        row.status === "PENDING" ? (
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-red-100 cursor-pointer">
              <IoClose className="text-red-600" />
            </button>
            <button className="p-2 rounded-full bg-green-100 cursor-pointer">
              <FaCheck className="text-green-600" />
            </button>
          </div>
        ) : row.status === "CONFIRMED" ? (
          <button>
            <GrCompliance />{" "}
          </button>
        ) : (
          <p>{"_"}</p>
        ),
    },
  ];

  useEffect(() => {
    if (!searchParams.get("page") || !searchParams.get("date")) {
      setSearchParams({ page: "1" }, { replace: true });
      setSearchParams({ page: today }, { replace: true });
    }
  }, []);

  console.log(data?.appointments);
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
