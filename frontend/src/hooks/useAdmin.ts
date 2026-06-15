import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DoctorsResponse } from "@/types/doctorType";
import api from "@/lib/axios";
import { approveDoctor, rejectDoctor } from "@/lib/api/admin";
import { toast } from "sonner";

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

export const useApproveDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveDoctor(id),

    onSuccess: () => {
      toast.success("Doctor approved successfully.");

      queryClient.invalidateQueries({
        queryKey: ["admin-doctors"],
      });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    },
  });
};

export const useRejectDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rejectDoctor(id),

    onSuccess: () => {
      toast.success("Doctor rejected successfully.");

      queryClient.invalidateQueries({
        queryKey: ["admin-doctors"],
      });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    },
  });
};
