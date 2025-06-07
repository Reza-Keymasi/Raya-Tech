"use client";

import React, { useState } from "react";

import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import UserForm from "../UserForm";
import { IUser } from "@/types/IUser";
import { useUpdateUser } from "@/lib/react-query/userQueries";
import { createUserFormStore } from "@/lib/stores/userFormStore";

export default function UpdateUserFormModal({ user }: { user: IUser }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const updateUserMutation = useUpdateUser();
  const setAll = createUserFormStore((state) => state.setAll);

  function handlecloseModal() {
    setIsOpenModal(false);
  }

  function handleUpdate(updatedUser: IUser) {
    updateUserMutation.mutate(updatedUser, {
      onSuccess: (data) => {
        setAll(data);
        handlecloseModal();
      },
    });
  }

  return (
    <>
      <Button className="w-[150px] h-12" onClick={() => setIsOpenModal(true)}>
        Update User
      </Button>
      <Modal
        className="w-[500px] h-[400px]"
        isOpen={isOpenModal}
        onClose={handlecloseModal}
      >
        <UserForm
          initialData={user}
          mode="update"
          onCloseModal={handlecloseModal}
          onSubmit={handleUpdate}
        />
      </Modal>
    </>
  );
}
