import React, { ChangeEvent, ComponentPropsWithoutRef } from "react";

type InputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<"input">;

export default function Input({ onChange, ...props }: InputProps) {
  return (
    <div className="relative py-5">
      <input
        id={props.name}
        onChange={onChange}
        className="peer block bg-transparent text-white px-1 border-b border-b-gray-300/60 focus:border-b-indigo-200 appearance-none focus:outline-0"
        value={props.value}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={props.name}
        className="peer-focus:top-0 peer-focus:text-indigo-200 peer-[:not(:placeholder-shown)]:top-0 flex items-center absolute top-[10px] left-1 transition-all duration-150 ease-in"
      >
        {props.name}
      </label>
    </div>
  );
}
