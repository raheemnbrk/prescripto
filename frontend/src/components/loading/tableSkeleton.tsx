import { Skeleton } from "../../../@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 5,
  columns = 5,
}: TableSkeletonProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
      <div className="grid bg-muted/40 p-4 gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-24 rounded-md" />
        ))}
      </div>

      <div className="divide-slate-100 divide-y">
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="grid p-4 gap-4 items-center"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: columns }).map((_, col) => (
              <Skeleton
                key={col}
                className={`h-4 rounded-md ${
                  col === 0
                    ? "w-32"
                    : col === columns - 1
                    ? "w-20"
                    : "w-full"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}