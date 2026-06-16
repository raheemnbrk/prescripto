import AppPagination from "@/components/admin/pagination";
import { Input } from "../../../@/components/ui/input";
import { FiSearch, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useAllUsers, useDeleteUser } from "@/hooks/useAdmin";
import TableSkeleton from "@/components/loading/tableSkeleton";
import { DataTable } from "@/components/admin/table";
import type { User } from "@/types/authTypes";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";

export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || "1");

  const { data, isLoading } = useAllUsers({ search, limit: 10, page });
  const deleteUser = useDeleteUser();

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
    { label: "Role", key: "role" },
    { label: "Email", key: "email" },
    {
      label: "Action",
      key: "action",
      render: (row: User) => (
        <button
          className="p-2 rounded-full bg-red-100 cursor-pointer"
          onClick={() => deleteUser.mutate(row.id)}
          disabled={deleteUser.isPending}
        >
          <FaTrash className="text-red-500" />
        </button>
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
      <h1 className="text-2xl font-bold">All Users</h1>
      <div className="bg-white border border-indigo-100 rounded-2xl p-4">
        <div className="flex items-center gap-3 w-full">
          <div className="relative flex-1 min-w-0">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-4 h-4" />
            <Input
              placeholder="Search by name or specialization..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateParams("search", e.target.value)
              }
              className="w-full pl-9 border-indigo-200 focus-visible:ring-indigo-500 rounded-md py-5"
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
      </div>
      {isLoading ? (
        <TableSkeleton rows={6} columns={4} />
      ) : (
        <DataTable data={data?.users || []} columns={columns} />
      )}
      <AppPagination page={page} totalPages={data?.totalPages || 1} />
    </div>
  );
}
