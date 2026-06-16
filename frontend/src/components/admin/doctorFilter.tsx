// DoctorsFilters.tsx
import { Input } from "../../../@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

export default function DoctorsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "ALL";

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

  return (
    <div className="bg-white border border-indigo-100 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-4 h-4" />
        <Input
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => updateParams("search", e.target.value)}
          className="pl-9 border-indigo-200 focus-visible:ring-indigo-500 rounded-md py-5"
        />
      </div>

      <Select
        value={status}
        onValueChange={(value) => updateParams("status", value)}
      >
        <SelectTrigger className="w-full md:w-48 border-indigo-200 focus:ring-main/30 cursor-pointer py-5 rounded-md">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent sideOffset={8}>
          <SelectItem value="ALL" className="cursor-pointer">
            All Statuses
          </SelectItem>
          <SelectItem value="PENDING" className="cursor-pointer">
            Pending
          </SelectItem>
          <SelectItem value="APPROVED" className="cursor-pointer">
            Approved
          </SelectItem>
          <SelectItem value="REJECTED" className="cursor-pointer">
            Rejected
          </SelectItem>
        </SelectContent>
      </Select>
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
  );
}
