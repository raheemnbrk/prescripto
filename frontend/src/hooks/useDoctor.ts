import { useQuery } from "@tanstack/react-query";
import {
  getAllDoctors,
  getAllSpecializations,
  getRelatedDoctors,
  getSingleDoctor,
} from "../lib/api/doctorApi";

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
