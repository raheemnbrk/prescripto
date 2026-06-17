import AppPagination from "@/components/admin/pagination";
import { DataTable } from "@/components/admin/table";
import TableSkeleton from "@/components/loading/tableSkeleton";
import { Input } from "../../../@/components/ui/input";
import { useDoctorPatients } from "@/hooks/useDoctor";
import { useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import type { User } from "@/types/authTypes";

export default function Patients() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  const search = searchParams.get("search") || "";
  const { data, isLoading } = useDoctorPatients({ search, page, limit: 10 });

  const updateParams = (key: string, value: string) => {
    const params: any = Object.fromEntries(searchParams.entries());
    if (value === "" || value === "ALL") delete params[key];
    else params[key] = value;
    params.page = "1";
    setSearchParams(params);
  };

  const clearSearch = () => {
    const params = Object.fromEntries(searchParams.entries());
    delete params.search;
    params.page = "1";
    setSearchParams(params);
  };

  const columns = [
    {
      label: "Image",
      key: "image",
      render: (row: User) => (
        <div className="rounded-full w-fit bg-main/10">
          <img
            src={
              row.image?.trim()
                ? row.image
                : "https://www.gravatar.com/avatar/?d=mp"
            }
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      ),
    },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    {
      label: "Phone",
      key: "phoneNumber",
      render: (row: User) => row.phoneNumber || "_",
    },
  ];

  useEffect(() => {
    if (!searchParams.get("page") || !searchParams.get("date")) {
      setSearchParams({ page: "1" }, { replace: true });
    }
  }, []);

  console.log(data?.patients);
  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-2xl font-bold">All Patients</h1>
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 min-w-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-4 h-4" />
          <Input
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateParams("search", e.target.value)
            }
            className="w-full pl-9 border-indigo-200 focus-visible:ring-main rounded-md py-5"
          />
        </div>

        {search && (
          <button
            onClick={clearSearch}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-2.5 rounded-md transition-all cursor-pointer shrink-0"
          >
            <FiX className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
      {isLoading ? (
        <TableSkeleton rows={6} columns={4} />
      ) : (
        <div className="flex flex-col space-y-3">
          <DataTable data={data?.patients || []} columns={columns} />

          <AppPagination page={page} totalPages={data?.totalPages || 1} />
        </div>
      )}
    </div>
  );
}
