"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useGetUser } from "@/lib/react-query/userQueries";
import Spinner from "@/components/spinner/Spinner";
import UpdateUserFormModal from "../modals/UpdateUserFormModal";
import { createUserFormStore } from "@/lib/stores/userFormStore";

export default function UserDetails() {
  const params = useParams();
  const { id } = params;

  const { data: user, isPending, isError } = useGetUser(Number(id));

  const formData = createUserFormStore((state) => state.data);
  const setAll = createUserFormStore((state) => state.setAll);

  useEffect(() => {
    if (user) {
      setAll(user);
    }
  }, [user, setAll]);

  if (isPending)
    return (
      <div className="absolute top-1/2 left-1/2">
        <Spinner />
      </div>
    );

  if (isError) return alert("Faild to fetch user");

  const { geo, ...addressWithoutGeo } = formData.address;
  const flatAddress = {
    ...addressWithoutGeo,
    ...geo,
  };

  return (
    <div>
      <div className="w-11/12 sm:w-10/12 xl:w-8/12 mx-auto mt-10 border border-sky-300 rounded-lg flex flex-col gap-6 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold border-b border-gray-100">
              General Info
            </h3>
            {Object.entries(formData).map(([key, value]) =>
              typeof value !== "object" && key !== "id" ? (
                <p
                  key={key}
                  className="flex flex-col text-md sm:text-lg font-semibold py-2 px-1"
                >
                  <span className="capitalize">{key}</span>{" "}
                  <span className="text-sm sm:text-base text-sky-200 font-light">
                    {value}
                  </span>
                </p>
              ) : null
            )}
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold border-b border-gray-100">
              Address
            </h3>
            <>
              {Object.entries(flatAddress).map(([key, value]) =>
                key === "lat" || key === "lng" ? null : (
                  <p
                    key={key}
                    className="flex flex-col text-md sm:text-lg font-semibold py-2 px-1"
                  >
                    <span className="capitalize">{key}</span>{" "}
                    <span className="text-sm sm:text-base text-sky-200 font-light">
                      {value}
                    </span>
                  </p>
                )
              )}

              <p className="flex flex-col text-md sm:text-lg font-semibold py-2 px-1">
                <span>Location</span>{" "}
                <span className="text-sm sm:text-base text-sky-200 font-light">
                  {flatAddress.lat}, {flatAddress.lng}
                </span>
              </p>
            </>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold border-b border-gray-100">
              Company
            </h3>
            {Object.entries(formData.company).map(([key, value]) =>
              typeof value !== "object" && key !== "id" ? (
                <p
                  key={key}
                  className="flex flex-col text-md sm:text-lg font-semibold py-2 px-1"
                >
                  <span className="capitalize">{key}</span>
                  <span className="text-sm sm:text-base text-sky-200 font-light">
                    {value}
                  </span>
                </p>
              ) : null
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4">
          <UpdateUserFormModal user={formData} />
        </div>
      </div>
    </div>
  );
}
