import { getMe, updateProfile } from "@/lib/api/user";
import { useAuthStore } from "@/store/authStore";
import type { User } from "@/types/authTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUser = () =>
  useQuery<User>({
    queryKey: ["me"],
    queryFn: getMe,
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: FormData) => updateProfile(data),
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
      setUser(user);
      toast.success("Profile updated successfully.");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    },
  });
};
