import { ChangeEvent, FocusEvent } from "react";

import Input from "@/components/input/Input";
import { IUser } from "@/types/IUser";

interface AddressFormProps {
  errors: Record<string, string>;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  user: IUser;
}

export default function AddressForm({
  errors,
  onBlur,
  onChange,
  user,
}: AddressFormProps) {
  return (
    <>
      <h2>Address</h2>
      <div className="flex space-x-3">
        <Input
          error={errors["address.city"]}
          label="city"
          name="city"
          onBlur={onBlur}
          onChange={onChange}
          value={user.address.city}
        />
        <Input
          error={errors["address.street"]}
          label="street"
          name="street"
          onBlur={onBlur}
          onChange={onChange}
          value={user.address.street}
        />
      </div>
      <div className="flex space-x-3">
        <Input
          error={errors["address.suite"]}
          label="suite"
          name="suite"
          onBlur={onBlur}
          onChange={onChange}
          value={user.address.suite}
        />
        <Input
          label="zipcode"
          name="zipcode"
          onChange={onChange}
          value={user.address.zipcode}
        />
      </div>
      <div className="flex space-x-3">
        <Input
          label="lat"
          name="lat"
          onChange={onChange}
          value={user.address.geo.lat}
        />
        <Input
          label="lng"
          name="lng"
          onChange={onChange}
          value={user.address.geo.lng}
        />
      </div>
    </>
  );
}
