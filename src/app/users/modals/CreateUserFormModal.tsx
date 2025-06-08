"use client";

import React, { useState } from "react";

import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import UserForm from "../UserForm";

export default function CreateUserFormModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handlecloseModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <Button className="w-[150px] h-12" onClick={() => setIsOpenModal(true)}>
        Create User
      </Button>
      <Modal
        className="w-[400px] sm:w-[500px] h-[400px]"
        isOpen={isOpenModal}
        onClose={handlecloseModal}
      >
        <UserForm mode="create" onCloseModal={handlecloseModal} />
      </Modal>
    </>
  );
}
