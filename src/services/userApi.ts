import { IUser } from "@/types/IUser";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<IUser[]> {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function fetchUser(id: number): Promise<IUser> {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response?.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}
