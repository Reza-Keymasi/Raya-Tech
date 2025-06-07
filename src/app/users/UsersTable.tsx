"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import Table from "@/components/table/Table";
import { IUser } from "@/types/IUser";
import { useGetUsers } from "@/lib/react-query/userQueries";
import Input from "@/components/input/Input";
import CreateUserFormModal from "./modals/CreateUserFormModal";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const { data: users } = useGetUsers();

  const filteredData = users?.filter((user) =>
    Object.entries(user).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleDetailsPage(user: UserTable) {
    router.push(`/users/${user.id}`);
  }

  return (
    <div className="mx-auto mt-10 px-4 w-11/12">
      <div className="flex justify-between">
        <CreateUserFormModal />
        <div className="pb-3 w-1/4">
          <Input
            label="Search Info"
            onChange={handleChange}
            type="text"
            value={searchQuery}
          />
        </div>
      </div>
      <Table
        columns={columns}
        data={filteredData || []}
        onDelete={() => {}}
        onDetails={handleDetailsPage}
      />
    </div>
  );
}
