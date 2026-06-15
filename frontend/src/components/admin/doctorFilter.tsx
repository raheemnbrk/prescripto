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
import { FiSearch } from "react-icons/fi";

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

  return (
    <div className="bg-white border border-indigo-100 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-4 h-4" />
        <Input
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => updateParams("search", e.target.value)}
          className="pl-9 border-indigo-200 focus-visible:ring-indigo-500 rounded-xl"
        />
      </div>

      <Select
        value={status}
        onValueChange={(value) => updateParams("status", value)}
      >
        <SelectTrigger className="w-full md:w-48 border-indigo-200 focus:ring-indigo-500 rounded-xl">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="APPROVED">Approved</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}