import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchUser,
  fetchUsers,
  createUser,
  updateUser,
} from "@/services/userApi";
import { IUser } from "@/types/IUser";

export function useGetUsers() {
  return useQuery<IUser[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

export function useGetUser(id: number) {
  return useQuery<IUser, Error>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });
}

export function useCreateUser() {
  const qc = useQueryClient();

  return useMutation<IUser, Error, Omit<IUser, "id">>({
    mutationFn: (newUser) => createUser(newUser),
    onSuccess: (createdUser) => {
      qc.setQueryData<IUser[] | undefined>(["users"], (prevUsers) => {
        if (!prevUsers) return [createdUser];
        return [...prevUsers, createdUser];
      });
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation<IUser, Error, IUser>({
    mutationFn: (updatedUser) => updateUser(updatedUser),
    onSuccess: (updatedUser) => {
      // ✅ Trigger re-fetch of that specific user
      qc.invalidateQueries({
        queryKey: ["user", updatedUser.id],
      });
    },
  });
}
