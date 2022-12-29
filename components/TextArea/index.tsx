import React, { useState } from "react";
import { useFormContext } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


interface InputProps {
  label: string;
  name: string;
  disabled: boolean;
  error?: string;
  value?: string;
}

const TextArea: React.FC<InputProps> = ({ label, name, disabled, error = "", value = "" }) => {

  const {
    register,
    formState: { errors }
  } = useFormContext()

    
  return (
    <>
      <div>
        <div>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              {label}
            </label>
            <div className="mt-1">
              <textarea
                id={name}
                autoComplete={name}
                required
                defaultValue={value}
                disabled={disabled}
                {...register(name)}
                rows={4}
                className={`block w-full appearance-none rounded-md border ${ errors[name] != null || error? "border-red-500" : "border-gray-300"} px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
              ></textarea>
            </div>
          </div>

        {errors[name] != null && (
                <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors[name]?.message as string}
                </span>
            )}
        {error && (
                <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </span>
            )}
      </div>
    </>
  );
};

export default TextArea;
