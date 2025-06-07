import Input from "@/components/input/Input";
import { IUser } from "@/types/IUser";
import { ChangeEvent } from "react";

interface CompanyFormProps {
  user: IUser;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CompanyForm({ user, onChange }: CompanyFormProps) {
  return (
    <>
      <h2>Company</h2>
      <div className="flex space-x-3">
        <Input
          label="company name"
          name="companyName"
          onChange={onChange}
          value={user.company.name}
        />
        <Input
          label="bs"
          name="bs"
          onChange={onChange}
          value={user.company.bs}
        />
      </div>
      <div className="flex space-x-3">
        <Input
          label="catch phrase"
          name="catchPhrase"
          onChange={onChange}
          value={user.company.catchPhrase}
        />
      </div>
    </>
  );
}
