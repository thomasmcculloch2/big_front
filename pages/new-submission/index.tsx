import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { INewSubmission } from "../../interfaces";
import { validationsNewSubmission } from "../../utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { newSubmission } from "../api";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import TextArea from "../../components/TextArea";


const NewSubmission = (): JSX.Element => {
  const [error, setError] = useState({ title: "", symptoms: "" });
  const [createError, setCreateError] = useState("");

  const router = useRouter();
  const methods = useForm<INewSubmission>({
    resolver: yupResolver(validationsNewSubmission),
  });

  const disabledButton =
    !(methods.formState.errors?.title == null) ||
    !(methods.formState.errors?.symptoms == null);

  const {
    mutate: newSub,
    isLoading,
    isSuccess,
  } = useMutation(
    async (submission: INewSubmission) => await newSubmission(submission),
    {
      onSuccess(data) {
        toast.success('Submission created successfully')
        router.push('/my-submissions');
      },
      onError(error: any) {
        //alert(error.request.response);
        console.log(error);
        setCreateError(error.response.data.message);
      },
    }
  );

  const onSubmit: SubmitHandler<INewSubmission> = (values) => {
    newSub(values);
  };


  return (
    <Sidebar>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white ">
        <div className="flex justify-between px-4 py-5 sm:px-6">
          <div>
            <span className="text-lg mr-3 leading-6 font-medium text-gray-900">
              New Submission
            </span>
          </div>
        </div>
        {/* EMAIL AND PHONE */}
        <div className="space-y-8 px-6">
          <div className="mt-8 sm:w-full sm:max-w-2xl">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
                action="#"
                method="POST"
                noValidate
              >
                <div className=" grid grid-cols-6 gap-4">
                  <div className=" items-center col-start-1 col-end-7">
                    <Input
                      name="title"
                      label="Title"
                      disabled={false}
                      type="text"
                      error={error.title}
                    />
                  </div>
                  <div className="items-center col-start-1 col-end-7 ">
                    <TextArea 
                      name="symptoms"
                      label="Symptoms"
                      disabled={false}
                      error={error.title}
                       />
                  </div>
                </div>

                <div className="w-40">
                  <Button label="Send submission" disabled={disabledButton}></Button>
                </div>

                {createError && (
                <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {createError}
                </span>
                )}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default NewSubmission;
