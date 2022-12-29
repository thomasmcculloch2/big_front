import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  error?: string;
  topMsg?: string;
}

const CheckBox: React.FC<InputProps> = ({
  label,
  name,
  error = "",
  topMsg = ".",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>

          <label className="block text-sm font-medium text-gray-700">
            {topMsg}
          </label>
          <div>
            <div className="flex items-center p-3 rounded-md border border-gray-300 mt-1">
              <input
                id={name}
                //value="doctor"
                //name="type"
                type="radio"
                value={name}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("type")}
              />
              <label
                htmlFor={name}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
            </div>
          </div>
          {errors[name] != null && (
                <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors[name]?.message as string}
                </span>
            )}
        </div>

        {/* <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <input
            id={name}
            type={type}
            autoComplete={name}
            required
            //value={value}
            disabled={disabled}
            {...register(name)}
            className={`block w-full  appearance-none rounded-md border ${ errors[name] != null || error? "border-red-500" : "border-gray-300"} px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
          />
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
            )} */}
    </>
  );
};

export default CheckBox;
