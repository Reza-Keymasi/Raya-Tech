"use client";

import React, { ReactNode } from "react";
import CrossIcon from "../icons/CrossIcon";

type ModalProps = {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Modal({
  children,
  className = "",
  isOpen,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-gray-700 opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="fixed z-10 bg-[#0F2027] dark:bg-gray-800 dark:text-white rounded-xl shadow-xl max-w-lg "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-10 absolute right-0 p-2 m-1 cursor-pointer rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <CrossIcon />
        </div>

        <div className={`${className}`}>{children}</div>
      </div>
    </div>
  );
}
