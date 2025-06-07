import { ChangeEvent, FocusEvent } from "react";

import Input from "@/components/input/Input";
import { IUser } from "@/types/IUser";

interface GeneralInfoFormProps {
  errors: Record<string, string>;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  user: IUser;
}

export default function GeneralInfoForm({
  errors,
  onBlur,
  onChange,
  user,
}: GeneralInfoFormProps) {
  return (
    <>
      <h2>General Info</h2>
      <div className="flex space-x-3">
        <Input
          error={errors.name}
          label="name"
          name="name"
          onBlur={onBlur}
          onChange={onChange}
          value={user.name}
        />
        <Input
          error={errors.username}
          label="username"
          name="username"
          onBlur={onBlur}
          onChange={onChange}
          value={user.username}
        />
      </div>
      <div className="flex space-x-3">
        <Input
          error={errors.email}
          label="email"
          name="email"
          onBlur={onBlur}
          onChange={onChange}
          value={user.email}
        />
        <Input
          error={errors.phone}
          label="phone number"
          name="phone"
          onBlur={onBlur}
          onChange={onChange}
          value={user.phone}
        />
      </div>
      <Input
        label="website"
        name="website"
        onChange={onChange}
        value={user.website}
      />
    </>
  );
}
