import React, { ComponentPropsWithoutRef } from "react";

import { ButtonCustomStyles } from "./ButtonCustomStyles";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger";
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  children,
  className = "",
  isDisabled = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  const { btnVariants } = ButtonCustomStyles({
    variant,
  });

  const disabledStyles = isDisabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const baseStyles = `rounded-lg shadow transition-all duration-200 py-2 px-4 ${btnVariants} ${disabledStyles}`;

  return (
    <button
      disabled={isDisabled}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
