import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllDoctors,
  getAllSpecializations,
  getDoctorPatients,
  getDoctorProfile,
  getRelatedDoctors,
  getSingleDoctor,
  getTopDoctors,
  toggleDoctorAvailability,
  updateDoctorProfile,
} from "../lib/api/doctorApi";
import type { DoctorProfile, PatientsResponse } from "@/types/doctorType";
import { toast } from "sonner";

export const useDoctors = (search?: string, filter?: string) => {
  return useQuery({
    queryKey: ["doctors", search, filter],
    queryFn: () => getAllDoctors(search, filter),
  });
};

export const useDoctor = (id: string) => {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getSingleDoctor(id),
  });
};

export const useSpecializations = () => {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: getAllSpecializations,
    staleTime: 60 * 60 * 1000,
  });
};

export const useRelatedDoctors = (id: string, specialization: string) => {
  return useQuery({
    queryKey: ["related", id, specialization],
    queryFn: () => getRelatedDoctors(id, specialization),
  });
};

export const useTopDoctors = (limit = 4) =>
  useQuery({
    queryKey: ["top-doctors", limit],
    queryFn: () => getTopDoctors(limit),
    staleTime: 1000 * 60 * 60,
  });

export const useDoctorPatients = (params: {
  search?: string;
  page: number;
  limit: number;
}) => {
  return useQuery<PatientsResponse>({
    queryKey: ["doctor-patients", params],
    queryFn: () => getDoctorPatients(params),
  });
};

export const useDoctorProfile = (enabled: boolean) =>
  useQuery<DoctorProfile>({
    queryKey: ["doctor-profile"],
    queryFn: getDoctorProfile,
    enabled,
  });

export const useToggleDoctorAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleDoctorAvailability,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-profile"],
      });

      toast.success("Availability updated");
    },

    onError: () => {
      toast.error("Failed to update availability");
    },
  });
};

export const useUpdateDoctorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctorProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-profile"],
      });

      toast.success("Doctor profile updated successfully");
    },

    onError: () => {
      toast.error("Failed to update doctor profile");
    },
  });
};
