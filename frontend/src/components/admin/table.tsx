import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../../../@/components/ui/table";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
}

export function DataTable<T>({
  columns,
  data,
  loading,
  emptyText = "No data found",
}: Props<T>) {
  return (
    <div className="bg-white border border-indigo-100 rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-indigo-50 hover:bg-indigo-50 border-b border-indigo-100">
            {columns.map((col) => (
              <TableHead
                key={col.label}
                className="text-indigo-700 font-semibold text-sm py-4"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="p-8 text-center text-gray-400"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  Loading...
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="p-10 text-center text-gray-400"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow
                key={i}
                className="border-b border-gray-50 hover:bg-indigo-50/40 transition-colors"
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.label}
                    className="py-4 text-sm text-gray-700"
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}