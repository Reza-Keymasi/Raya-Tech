import { create } from "zustand";

import { IUser } from "@/types/IUser";
import { runValidateField } from "@/utils/validateUser";

type FormMode = "create" | "update";

interface UserFormStore {
  data: IUser;
  mode: FormMode;
  errors: Record<string, string>;
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setField: (path: string, value: any) => void;
  setMode: (mode: FormMode) => void;
  setAll(data: IUser): void;
  validateField: (path: string) => void;
  reset: () => void;
}

function generateNextId() {
  return Math.random();
}

function setNestedValueImmutable<T>(obj: T, path: string[], value: any): T {
  if (path.length === 0) {
    return value as T;
  }

  const [head, ...rest] = path;

  const currentObjLevel =
    obj && typeof obj === "object" && !Array.isArray(obj) ? obj : {};

  if (rest.length === 0) {
    return {
      ...currentObjLevel,
      [head]: value,
    } as T;
  } else {
    return {
      ...currentObjLevel,
      [head]: setNestedValueImmutable(
        (currentObjLevel as any)[head],
        rest,
        value
      ),
    } as T;
  }
}

function createInitialFormData(): IUser {
  return {
    id: generateNextId(),
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };
}

function deepClone<T>(obj: T) {
  return structuredClone(obj);
}

export const createUserFormStore = create<UserFormStore>((set, get) => ({
  data: deepClone(createInitialFormData()),
  mode: "create",
  errors: {},
  step: 0,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  setField: (path, value) =>
    set((state) => ({
      data: setNestedValueImmutable(state.data, path.split("."), value),
    })),
  setMode: (mode) => set({ mode }),
  setAll: (data) => set({ data: deepClone(data) }),
  validateField: (path) => {
    const { data } = get();
    const error = runValidateField(path, data);
    set((state) => ({ errors: { ...state.errors, [path]: error } }));
  },
  reset: () => set({ data: createInitialFormData(), errors: {} }),
}));
