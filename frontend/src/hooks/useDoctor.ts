import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../lib/api/doctorApi";

export const useDoctors = (search?: string, filter?: string) => {
  return useQuery({
    queryKey: ["doctors", search, filter],
    queryFn: () => getAllDoctors(search, filter),
  });
};
