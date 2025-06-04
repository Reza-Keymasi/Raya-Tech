type StyleProps = {
  variant: "primary" | "secondary" | "borderGray" | "success" | "danger";
};

export const ButtonCustomStyles = ({ variant = "primary" }: StyleProps) => {
  const btnVariants = {
    primary: "bg-sky-300 hover:bg-sky-100 text-sky-900",
    secondary: "bg-gray-600 hover:bg-gray-500 text-white",
    success: "bg-lime-600 hover:bg-lime-500 text-white",
    borderGray: "bg-transparent text-gray-900 border border-gray-900",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  }[variant];

  return { btnVariants };
};
