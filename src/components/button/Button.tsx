import React, { ComponentPropsWithoutRef } from "react";

import { ButtonCustomStyles } from "./ButtonCustomStyles";

type ButtonProps = {
  variant?: "primary" | "secondary" | "success" | "danger" | "borderGray";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  variant = "primary",
  children,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  const { btnVariants } = ButtonCustomStyles({
    variant,
  });

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const baseStyles = `rounded-lg shadow transition-all duration-200 py-2 px-4 ${btnVariants} ${disabledStyles}`;

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
