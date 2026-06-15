import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

interface AppPaginationProps {
  page: number;
  totalPages: number;
  paramName?: string;
}

export default function AppPagination({
  page,
  totalPages,
  paramName = "page",
}: AppPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (newPage: number) => {
    const params = Object.fromEntries(searchParams.entries());
    params[paramName] = String(newPage);
    setSearchParams(params);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            onClick={() => page > 1 && setPage(page - 1)}
            className={
              page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink size="sm" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            size="sm"
            onClick={() => page < totalPages && setPage(page + 1)}
            className={
              page >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
