import { ChangeEvent, FocusEvent, useEffect } from "react";

import Button from "@/components/button/Button";
import GeneralInfoForm from "./step-forms/GeneralInfoForm";
import AddressForm from "./step-forms/AddressForm";
import CompanyForm from "./step-forms/CompanyForm";
import Spinner from "@/components/spinner/Spinner";
import { createUserFormStore } from "@/lib/stores/userFormStore";
import { useCreateUser, useUpdateUser } from "@/lib/react-query/userQueries";
import { IUser } from "@/types/IUser";

interface IUserFormProps {
  initialData?: IUser;
  mode: "create" | "update";
  onCloseModal: () => void;
  onSubmit?: (updatedUser: IUser) => void;
}

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

export default function UserForm({
  initialData,
  mode,
  onCloseModal,
  onSubmit,
}: IUserFormProps) {
  const {
    data: user,
    errors,
    step,
    setStep,
    nextStep,
    prevStep,
    setField,
    reset,
    validateField,
  } = createUserFormStore();

  const {
    mutate: createUserMutation,
    isPending: isPendingCreate,
    isError: IsErrorCreating,
    isSuccess,
    error: creatingError,
    data: create,
  } = useCreateUser();

  const {
    mutate: updateUserMutation,
    isPending: isPendingUpdate,
    isError: isErrorUpdating,
    error: updatingError,
  } = useUpdateUser();

  useEffect(() => {
    reset();
    setStep(0);
  }, []);

  useEffect(() => {
    const { setAll, reset, setStep, setMode } = createUserFormStore.getState();

    setMode(mode);

    if (mode === "update" && initialData) {
      setAll(initialData);
    }

    if (mode === "create") {
      reset();
    }

    setStep(0);
  }, [mode, initialData?.id]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputName = e.target.name;
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

  function handleSubmitForm() {
    const { data: user } = createUserFormStore.getState();
    try {
      if (mode === "create") {
        if (IsErrorCreating)
          alert(`Error occured when creating user: ${creatingError}`);
        createUserMutation(user, {
          onSuccess: () => {
            onCloseModal?.();
          },
        });
      } else if (mode === "update") {
        if (isErrorUpdating)
          alert(`Error occured when creating user: ${updatingError}`);
        updateUserMutation(user, {
          onSuccess: (updatedUser) => {
            onSubmit?.(updatedUser);
            onCloseModal?.();
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col h-full w-[400px] sm:w-[500px] space-y-3 px-5 py-10 sm:p-8">
      {isPendingCreate || isPendingUpdate ? (
        <div className="absolute top-1/2 left-1/2">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto space-y-3">
            {step === 0 && (
              <GeneralInfoForm
                errors={errors}
                onBlur={handleBlur}
                onChange={handleChange}
                user={user}
              />
            )}
            {step === 1 && (
              <AddressForm
                errors={errors}
                onBlur={handleBlur}
                onChange={handleChange}
                user={user}
              />
            )}
            {step === 2 && <CompanyForm onChange={handleChange} user={user} />}
          </div>

          <div className="flex justify-between ">
            <div className="flex space-x-3 w-[250px]">
              <Button
                className="w-1/2"
                isDisabled={step === 0}
                onClick={prevStep}
                variant="primary"
              >
                Prev
              </Button>
              {step < 2 ? (
                <Button
                  className="w-1/2"
                  variant="primary"
                  isDisabled={disabledBtn}
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={handleSubmitForm}>
                  Save
                </Button>
              )}
            </div>
            <Button
              className="w-1/4"
              variant="secondary"
              onClick={handleResetForm}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
