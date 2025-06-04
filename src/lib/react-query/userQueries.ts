import { useQuery } from "@tanstack/react-query";

import { fetchUser, fetchUsers } from "@/services/userApi";
import { IUser } from "@/types/IUser";

export function useGetUsers() {
  return useQuery<IUser[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

export function useGetUser(userId: number) {
  return useQuery<IUser, Error>({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  });
}
