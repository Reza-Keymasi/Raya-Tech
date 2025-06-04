"use client";

import Table from "@/components/table/Table";
import { IUser } from "@/types/IUser";
import { useGetUsers } from "@/lib/react-query/userQueries";

const columns: { header: string; accessor: keyof UserTable }[] = [
  { header: "#", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
];

type UserTable = Pick<
  IUser,
  "id" | "name" | "username" | "email" | "phone" | "website"
>;

export default function UsersTable() {
  const { data: users } = useGetUsers();

  const userData: UserTable[] =
    users?.map(({ id, name, username, email, phone, website }) => ({
      id,
      name,
      username,
      email,
      phone,
      website,
    })) || [];

  return (
    <div className="mx-auto mt-10 px-4 w-11/12">
      <Table data={userData || []} columns={columns} />
    </div>
  );
}
