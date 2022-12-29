import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../pages/api";
import { IUploadFile } from "../../interfaces/index";

interface FileInputProps {
  name: string;
  disabled: boolean;
  type: string;
  error?: string;
}
//const [createError, setCreateError] = useState('');

const FileInput: React.FC<FileInputProps> = ({
  name,
  disabled,
  type,
  error = "",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();


  const { mutate: finish } = useMutation(
    async (file: IUploadFile) => await uploadFile(file),
    {
      onSuccess(data) {
        alert("success");
      },
      onError(error: any) {
        alert(error.request.response);
        //setCreateError(error.request.response);
      },
    }
  );

  const onSubmit = (data: any) => {
    finish(data.file_input[0]);
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex h-12">
        <div className="items-center col-start-1 col-end-3">
          <input
            className=" block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id={name}
            type={type}
            required
            disabled={disabled}
            {...register({name})}
          />
        </div>
        <div className="w-32 ml-4">
          <Button label="Upload" disabled={false} />
        </div>
        {/* {createError && (
          <span className="mt-2 text-sm text-red-600 dark:text-red-500">
            {createError}
          </span>
        )} */}
      </div>
    </form>
  );
};

export default FileInput;
