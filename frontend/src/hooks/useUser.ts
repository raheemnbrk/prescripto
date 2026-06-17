import { getMe } from "@/lib/api/user";
import type { User } from "@/types/authTypes";
import { useQuery } from "@tanstack/react-query";


export const useUser = () =>
  useQuery<User>({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  });
