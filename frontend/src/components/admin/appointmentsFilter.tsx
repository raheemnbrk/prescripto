import { Input } from "../../../@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import FilterSelect from "../layout/filterSelect";

export default function AppointmentFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const searchBy = searchParams.get("searchBy") || "doctor";
  const status = searchParams.get("status") || "ALL";
  const range = searchParams.get("range") || "ALL";

  const updateParams = (key: string, value: string) => {
    const params = Object.fromEntries(searchParams.entries());

    if (!value || value === "ALL") {
      delete params[key];
    } else {
      params[key] = value;
    }

    params.page = "1";
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({ page: "1" });
  };

  return (
    <div className="bg-white border border-indigo-100 rounded-md p-4 flex flex-col lg:flex-row gap-3">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-4 h-4" />

        <Input
          placeholder={`Search by ${searchBy}...`}
          value={search}
          onChange={(e) => updateParams("search", e.target.value)}
          className="pl-9 border-indigo-200 focus-visible:ring-main rounded-md py-5"
        />
      </div>

      <FilterSelect
        value={searchBy}
        placeholder="Search By"
        onChange={(value) => updateParams("searchBy", value)}
        options={[
          { label: "Doctor", value: "doctor" },
          { label: "User", value: "user" },
        ]}
      />

      <FilterSelect
        value={status}
        placeholder="Status"
        onChange={(value) => updateParams("status", value)}
        options={[
          { label: "All Statuses", value: "ALL" },
          { label: "Pending", value: "PENDING" },
          { label: "Confirmed", value: "CONFIRMED" },
          { label: "Completed", value: "COMPLETED" },
          { label: "Cancelled", value: "CANCELLED" },
        ]}
      />

      <FilterSelect
        value={range}
        placeholder="Range"
        onChange={(value) => updateParams("range", value)}
        options={[
          { label: "All Time", value: "ALL" },
          { label: "Last 7 Days", value: "last7days" },
          { label: "Last 30 Days", value: "last30days" },
          { label: "Last 12 Months", value: "last12months" },
        ]}
      />

      {(search ||
        searchBy !== "doctor" ||
        status !== "ALL" ||
        range !== "ALL") && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-2.5 rounded-md transition-all cursor-pointer shrink-0"
        >
          <FiX className="w-4 h-4" />
          Clear
        </button>
      )}
    </div>
  );
}
