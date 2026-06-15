import { useSearchParams } from "react-router-dom";

import DoctorsFilters from "@/components/admin/doctorFilter";
import TableSkeleton from "@/components/loading/tableSkeleton";
import { DataTable } from "@/components/admin/table";
import AppPagination from "@/components/admin/pagination";
import { useAllDoctors } from "@/hooks/useAdmin";

export default function AllDoctors() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const { data, isLoading } = useAllDoctors({
    page,
    search,
    status,
  });

  console.log(data);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">All Doctors</h1>

      <DoctorsFilters />

      {isLoading ? (
        <TableSkeleton rows={6} columns={4} />
      ) : (
        <DataTable
          data={data?.doctors || []}
          columns={[
            { label: "Name", key: "name" },
            { label: "Specialization", key: "specialization" },
            { label: "Fees", key: "fees" },
            { label: "Status", key: "status" },
          ]}
        />
      )}

      <AppPagination page={page} totalPages={data?.totalPages || 1} />
    </div>
  );
}
