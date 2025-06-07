import type { IUser } from "@/types/IUser";

export function runValidateField(path: string, data: IUser) {
  let value = path.split(".").reduce((acc: any, key) => acc[key], data);
  let field = path.split(".").pop();

  let error = "";

  const excludedValidationPaths = [
    "company.name",
    "company.bs",
    "company.catchPhrase",
    "website",
    "address.zipcode",
  ];

  if (excludedValidationPaths.includes(path)) {
    return "";
  }

  const phoneNumberRegex = /^[0-9-]*$/;

  if (!value || (typeof value === "string" && value.trim().length < 5)) {
    error = `${field} must be at least 5 character`;
  }

  if (field === "email" && !value.includes("@")) {
    error = "Invalid email";
  }

  if (field === "phone" && value && !phoneNumberRegex.test(value)) {
    error = "Only numbers and dashes";
  }

  return error;
}
