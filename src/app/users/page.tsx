import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { fetchUsers } from "@/services/userApi";
import { getQueryClient } from "../get-query-client";
import UsersTable from "./UsersTable";

export default async function UsersPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="min-h-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersTable />
      </HydrationBoundary>
    </div>
  );
}
