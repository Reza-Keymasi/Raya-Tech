import { ChangeEvent, ComponentPropsWithoutRef, FocusEvent } from "react";

type InputProps = {
  error?: string | null;
  name?: string;
  label: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<"input">;

export default function Input({
  error,
  label,
  name,
  onBlur,
  onChange,
  ...props
}: InputProps) {
  const modifiedLabel = label?.charAt(0).toUpperCase() + label?.slice(1);
  return (
    <div className="relative mb-2 w-full">
      <input
        className={`peer h-12 w-full bg-transparent text-white px-2 rounded-lg border ${
          error
            ? "border-orange-400"
            : "border-gray-300/60 focus:border-indigo-200"
        } focus:outline-0 appearance-none`}
        id={label}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder=" "
        {...props}
      />
      <label
        className={`flex items-center absolute top-3 left-2 text-sm transition-all duration-150 ease-in peer-focus:top-0.5  ${
          error ? "text-orange-400" : "peer-focus:text-indigo-200"
        } peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0.5 peer-[:not(:placeholder-shown)]:text-xs`}
        htmlFor={label}
      >
        {modifiedLabel}
      </label>
      <div className="h-1 text-[10px] capitalize text-orange-400 pl-2 pt-0.5">
        {error}
      </div>
    </div>
  );
}
