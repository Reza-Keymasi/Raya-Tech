import { ChangeEvent, ComponentPropsWithoutRef } from "react";

type InputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<"input">;

export default function Input({ onChange, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        className="peer h-12 w-full bg-transparent text-white px-2 rounded-lg border border-gray-300/60 focus:border-indigo-200 focus:outline-0 appearance-none"
        id={props.name}
        onChange={onChange}
        placeholder=" "
        {...props}
      />
      <label
        className="flex items-center absolute top-3 left-2 text-sm transition-all duration-150 ease-in peer-focus:top-0.5 peer-focus:text-indigo-200 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0.5 peer-[:not(:placeholder-shown)]:text-xs"
        htmlFor={props.name}
      >
        {props.name}
      </label>
    </div>
  );
}
