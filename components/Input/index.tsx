import React, { useState } from "react";
import { useFormContext } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


interface InputProps {
  label: string;
  name: string;
  disabled: boolean;
  type: string;
  error?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({ label, name, disabled, type, error = "", value = "" }) => {

  const {
    register,
    formState: { errors }
  } = useFormContext()


  const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    
  return (
    <>
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1 relative">
          <input
            id={name}
            type={showPassword ? "text" : type}
            autoComplete={name}
            required
            defaultValue={value}
            disabled={disabled}
            {...register(name)}
            className={`block w-full  appearance-none rounded-md border ${ errors[name] != null || error? "border-red-500" : "border-gray-300"} px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
          />
          {(name === "password" || name === "confirm_password") && (
                    <span className="absolute inset-y-0 right-2 flex items-center pl-2 z-10">
                        <button onClick={(e) => toggleShowPassword(e)}>
                            {showPassword ? (
                                <EyeIcon className="h-6 font-extralight" />
                            ) : (
                                <EyeSlashIcon className="h-6 font-extralight" />
                            )}
                        </button>
                    </span>
                )}
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

export default Input;
