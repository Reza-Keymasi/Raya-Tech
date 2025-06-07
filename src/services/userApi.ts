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

export async function createUser(newUser: Omit<IUser, "id">): Promise<IUser> {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export async function updateUser(updatedUser: IUser): Promise<IUser> {
  const response = await fetch(`${BASE_URL}/users/${updatedUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}
