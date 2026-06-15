import { Skeleton } from "../../../@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 3,
  columns = 5,
}: TableSkeletonProps) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/30">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="p-4">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row} className="border-b">
              {Array.from({ length: columns }).map((_, col) => (
                <td key={col} className="p-4">
                  <Skeleton
                    className={`h-4 ${
                      col === 0
                        ? "w-32"
                        : col === columns - 1
                          ? "w-20"
                          : "w-full"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
