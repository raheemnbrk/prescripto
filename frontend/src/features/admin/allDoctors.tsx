import { useSearchParams } from "react-router-dom";

import DoctorsFilters from "@/components/admin/doctorFilter";
import TableSkeleton from "@/components/loading/tableSkeleton";
import { DataTable } from "@/components/admin/table";
import AppPagination from "@/components/admin/pagination";
import { useAllDoctors } from "@/hooks/useAdmin";
import type { Doctor } from "@/types/doctorType";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useApproveDoctor, useRejectDoctor } from "@/hooks/useAdmin";
import { useEffect } from "react";

export default function AllDoctors() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const { data, isLoading } = useAllDoctors({
    page,
    search,
    status,
  });

  const approveDoctor = useApproveDoctor();
  const rejectDoctor = useRejectDoctor();

  const columns = [
    {
      label: "Image",
      key: "image",
      render: (row: Doctor) => (
        <div className="rounded-full w-fit bg-main/10">
          <img
            src={(row as Doctor).image}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      ),
    },
    { label: "Name", key: "name" },
    { label: "Specialization", key: "specialization" },
    { label: "Fees", key: "fees" },
    { label: "Degree", key: "degree" },
    { label: "Status", key: "status" },
    {
      label: "Action",
      key: "action",
      render: (row: Doctor) =>
        row.status === "APPROVED" || row.status === "REJECTED" ? (
          <p>{"_"}</p>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full bg-red-100 cursor-pointer"
              onClick={() => rejectDoctor.mutate(row.userId)}
              disabled={rejectDoctor.isPending}
            >
              <IoClose className="text-red-600" />
            </button>
            <button
              className="p-2 rounded-full bg-green-100 cursor-pointer"
              onClick={() => approveDoctor.mutate(row.userId)}
              disabled={approveDoctor.isPending}
            >
              <FaCheck className="text-green-600" />
            </button>
          </div>
        ),
    },
  ];

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: "1" }, { replace: true });
    }
  }, []);
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">All Doctors</h1>

      <DoctorsFilters />

      {isLoading ? (
        <TableSkeleton rows={6} columns={4} />
      ) : (
        <div className="flex flex-col space-y-3" >
          <DataTable data={data?.doctors || []} columns={columns} />
          <AppPagination page={page} totalPages={data?.totalPages || 1} />
        </div>
      )}
    </div>
  );
}
