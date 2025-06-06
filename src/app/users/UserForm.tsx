import { ChangeEvent, FocusEvent, useEffect } from "react";

import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { createUserFormStore } from "@/lib/stores/userFormStore";

const fieldsPerStep: Record<number, string[]> = {
  0: ["name", "username", "email", "phone"],
  1: ["city", "street", "suite"],
  2: [],
};

const fieldToPathMap: Record<string, string> = {
  name: "name",
  username: "username",
  email: "email",
  phone: "phone",
  website: "website",

  city: "address.city",
  street: "address.street",
  suite: "address.suite",
  zipcode: "address.zipcode",
  lat: "address.geo.lat",
  lng: "address.geo.lng",

  bs: "company.bs",
  catchPhrase: "company.catchPhrase",
  companyName: "company.name",
};

export default function UserForm() {
  const {
    data: user,
    mode,
    errors,
    step,
    setStep,
    nextStep,
    prevStep,
    setField,
    reset,
    validateField,
  } = createUserFormStore();

  useEffect(() => {
    reset();
    setStep(0);
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputName = e.target.name;
    console.log(inputName);
    const path = fieldToPathMap[inputName];
    setField(path, e.target.value);
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const field = e.target.name;
    const path = fieldToPathMap[field];
    if (path) {
      validateField(path);
    }
  }

  function handleNextStep() {
    const fields = fieldsPerStep[step];

    fields.forEach((field) => {
      const path = fieldToPathMap[field];
      if (path) {
        validateField(path);
      }
    });
    const hasError = fields.some((field) => errors[field]);
    console.log(hasError);
    console.log(errors);

    if (!hasError) nextStep();
  }

  const disabledBtn = fieldsPerStep[step].some((field) => {
    const path = fieldToPathMap[field];
    const value = path.split(".").reduce((acc: any, key) => acc[key], user);
    return errors[path] || !value;
  });

  function handleResetForm() {
    reset();
    setStep(0);
  }

  function generalInfoForm() {
    return (
      <>
        <h2>General Info</h2>
        <div className="flex space-x-3">
          <Input
            error={errors.name}
            name="name"
            label="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.name}
          />

          <Input
            error={errors.username}
            name="username"
            label="username"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.username}
          />
        </div>
        <div className="flex space-x-3">
          <Input
            error={errors.email}
            name="email"
            label="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.email}
          />
          <Input
            error={errors.phone}
            name="phone"
            label="phone number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.phone}
          />
        </div>
        <div>
          <Input
            name="website"
            label="website"
            onChange={handleChange}
            value={user.website}
          />
        </div>
      </>
    );
  }

  function addressForm() {
    return (
      <>
        <h2>Address</h2>
        <div className="flex space-x-3">
          <Input
            error={errors["address.city"]}
            name="city"
            label="city"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.address.city}
          />

          <Input
            error={errors["address.street"]}
            name="street"
            label="street"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.address.street}
          />
        </div>
        <div className="flex space-x-3">
          <Input
            error={errors["address.suite"]}
            name="suite"
            label="suite"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.address.suite}
          />
          <Input
            name="zipcode"
            label="zipcode"
            onChange={handleChange}
            value={user.address.zipcode}
          />
        </div>
        <div className="flex space-x-3">
          <Input
            name="lat"
            label="lat"
            onChange={handleChange}
            value={user.address.geo.lat}
          />
          <Input
            name="lng"
            label="lng"
            onChange={handleChange}
            value={user.address.geo.lng}
          />
        </div>
      </>
    );
  }

  function companyForm() {
    return (
      <>
        <h2>Company</h2>
        <div className="flex space-x-3">
          <Input
            name="companyName"
            label="company name"
            onChange={handleChange}
            value={user.company.name}
          />

          <Input
            name="bs"
            label="bs"
            onChange={handleChange}
            value={user.company.bs}
          />
        </div>
        <div className="flex space-x-3">
          <Input
            name="catchPhrase"
            label="catch phrase"
            onChange={handleChange}
            value={user.company.catchPhrase}
          />
        </div>
      </>
    );
  }

  return (
    <div className="w-[500px] space-y-3 p-10">
      {step === 0 && generalInfoForm()}
      {step === 1 && addressForm()}
      {step === 2 && companyForm()}

      <div className="flex justify-between my-10">
        <div className="flex space-x-3 w-[250px]">
          <Button
            className=""
            isDisabled={step === 0}
            onClick={prevStep}
            variant="primary"
          >
            Prev
          </Button>
          {step < 2 ? (
            <Button
              variant="primary"
              isDisabled={disabledBtn}
              onClick={handleNextStep}
            >
              Next
            </Button>
          ) : (
            <Button variant="success">Save</Button>
          )}
        </div>
        <Button variant="secondary" onClick={handleResetForm}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
