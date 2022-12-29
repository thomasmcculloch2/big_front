

import React, { useState, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { IInfo } from "../../interfaces";
import { validationsPatientInfo } from "../../utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { patientInfo } from "../api";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import TextArea from "../../components/TextArea";



const PatientInfo = (): JSX.Element => {

  const { user, isLogedIn, role, logoutUserContext } = useContext(AuthContext);
  const [error, setError] = useState({ phone: "", weight: "", height: "", info: "" });
  const [createError, setCreateError] = useState("");

  const methods = useForm<IInfo>({
    resolver: yupResolver(validationsPatientInfo),
  });


  const router = useRouter();

  const disabledButton =
    !(methods.formState.errors?.phone == null) ||
    !(methods.formState.errors?.weight == null) ||
    !(methods.formState.errors?.height == null) ||
    !(methods.formState.errors?.info == null);

  const {
    mutate: info,
    isLoading,
    isSuccess,
  } = useMutation(
    async (patInfo: IInfo) => await patientInfo(patInfo),
    {
      onSuccess(data) {
        
        toast.success('Information saved successfully')
        //router.push("/new-submission");
      },
      onError(error: any) {
        //alert(error.request.response);
        //setError(JSON.parse(error.request.response).error.fields)
        setCreateError(error.response.data.message);
      },
    }
  );

  const onSubmit: SubmitHandler<IInfo> = (values) => {
    info(values);
  };

  return (
    <Sidebar>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white ">
        <div className="flex justify-between px-4 py-5 sm:px-6">
          <div>
            <span className="text-lg mr-3 leading-6 font-medium text-gray-900">
              Patient information
            </span>
            {!user?.info && (<div className="mt-2 text-sm text-gray-500">
              You need to complete your profile before adding a submission
            </div>
            )}
            
          </div>
        </div>
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
                {" "}
                <div className=" grid grid-cols-6 gap-4">
                  <div className=" items-center col-start-1 col-end-7">
                    <Input
                      name="phone"
                      label="Phone number"
                      disabled={false}
                      type="text"
                      value={user?.info?.phone}
                      error={error.phone}
                    />
                  </div>
                  <div className=" items-center col-start-1 col-end-4">
                    <Input
                      name="weight"
                      label="Weight"
                      disabled={false}
                      type="text"
                      value={user?.info?.weight}
                      error={error.weight}
                    />
                  </div>
                  <div className="items-center col-start-4 col-end-7">
                    <Input
                      name="height"
                      label="Height"
                      disabled={false}
                      type="text"
                      value={user?.info?.height}
                      error={error.height}
                    />
                  </div>
                  <div className="items-center col-start-1 col-end-7">
                    <TextArea 
                      name="info"
                      label="Other info"
                      disabled={false}
                      value={user?.info?.info}
                      error={error.info}
                       />
                  </div>
                  {/* <div className="items-center col-start-1 col-end-7 ">
                    <div>
                      <label
                        htmlFor="other-info"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Other info
                      </label>
                      <div className="mt-1">
                        <textarea
                          rows={4}
                          id="other-info"
                          name="other-info"
                          autoComplete="other-info"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="w-40">
                  <Button
                    label="Update profile"
                    disabled={disabledButton}
                  ></Button>
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

export default PatientInfo;
