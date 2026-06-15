import { useQuery } from "@tanstack/react-query";
import type { DoctorsResponse } from "@/types/doctorType";
import api from "@/lib/axios";

export const useAllDoctors = ({
  page,
  status,
  search,
}: {
  page: number;
  status: string;
  search: string;
}) =>
  useQuery<DoctorsResponse>({
    queryKey: ["admin-doctors", page, status, search],
    queryFn: async () => {
      const res = await api.get("/admin/all-doctors", {
        params: {
          page,
          status: status || undefined,
          search: search || undefined,
        },
      });
      return res.data;
    },
  });
