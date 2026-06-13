import { useQuery } from "@tanstack/react-query";
import { getAllDoctors, getAllSpecializations } from "../lib/api/doctorApi";

export const useDoctors = (search?: string, filter?: string) => {
  return useQuery({
    queryKey: ["doctors", search, filter],
    queryFn: () => getAllDoctors(search, filter),
  });
};

export const useSpecializations = () => {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: getAllSpecializations,
    staleTime: 60 * 60 * 1000,
  });
};
