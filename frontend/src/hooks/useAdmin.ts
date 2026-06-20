import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Doctor, DoctorsResponse } from "@/types/doctorType";
import {
  approveDoctor,
  deleteUser,
  getAdminStats,
  getAllAppointments,
  getAllDoctors,
  getALlUsers,
  getPendingDoctors,
  rejectDoctor,
} from "@/lib/api/admin";
import { toast } from "sonner";
import type { statsRes, UsersResponse } from "@/types/admin";
import type { AppointmentFilters, appointmentRes } from "@/types/appointments";

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
    queryFn: () => getAllDoctors({ page, status, search }),
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

      queryClient.invalidateQueries({
        queryKey: ["pending-doctor"],
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

      queryClient.invalidateQueries({
        queryKey: ["pending-doctor"],
      });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    },
  });
};

export const useAllUsers = ({
  search,
  limit,
  page,
}: {
  search?: string;
  limit: number;
  page: number;
}) =>
  useQuery<UsersResponse>({
    queryKey: ["admin-users", search, limit, page],
    queryFn: () => getALlUsers({ search, limit, page }),
  });

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    },
  });
};

export const useAdminAppointments = (filters: AppointmentFilters) => {
  const { page, search, searchBy, status, range } = filters;

  return useQuery<appointmentRes>({
    queryKey: [
      "admin-appointments",
      page,
      search ?? "",
      searchBy ?? "",
      status ?? "",
      range ?? "",
    ],
    queryFn: () => getAllAppointments(filters),
  });
};

export const useAdminStats = () => {
  return useQuery<statsRes>({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });
};

export const usePendingDoctors = () => {
  return useQuery<Doctor[]>({
    queryKey: ["pending-doctor"],
    queryFn: getPendingDoctors,
  });
};
