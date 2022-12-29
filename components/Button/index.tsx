import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Spinner from "../Spinner";

interface ButtonProps {
  label: string;
  disabled: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  isLoading = false,
  onClick,
}) => {
  return (
    <>
      <button
        type="submit"
        disabled={disabled}
        onClick={onClick}
        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium
                text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? <Spinner /> : <>{label}</>}
      </button>
    </>
  );
};

export default Button;
