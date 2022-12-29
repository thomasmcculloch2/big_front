import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import {
  InformationCircleIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/20/solid";
import {
  IFileUploadResponse,
  ISubmission,
  IUploadFile,
} from "../../interfaces";
import type { NextPage } from "next";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Router, { useRouter } from "next/router";
import StatusBadge from "../../components/statusBadge";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  acceptSubmission,
  fetchSubmission,
  finishSubmission,
  getUploadedFile,
} from "../api";
import { AuthContext } from "../../context";
import FileInput from "../../components/FileInput";
import { uploadFile } from "../../pages/api";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import { AiOutlineFileText } from "react-icons/ai";
import { TbForbid } from "react-icons/tb";
import { toast } from 'react-toastify';


function useSubmission(id: string | string[] | undefined): {
  dataSub: ISubmission;
  isLoading: boolean;
} {
  const { data: submissionData, isLoading } = useQuery(
    ["getSubmission",id],
    async () => await fetchSubmission(id),
    {enabled: id !== undefined}
  );

  const dataSub = submissionData;

  return {
    dataSub,
    isLoading,
  };
}


  // --------------SUBMISSION PAGE----------------

  const SubmissionPage = () => {
  const router = useRouter();
  const id: string | string[] | undefined = router.query.id;

  const { role } = useContext(AuthContext);
  const { dataSub: submission } = useSubmission(id);

  const [prescription, setPrescription] = React.useState("no prescription added");
  const [havePrescription, setHavePrescription] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('')
  const [prescriptionModal, setPrescriptionModal] = React.useState(false);


  const { mutate: accept } = useMutation(
    async (id: number) => await acceptSubmission(id),
    {
      onSuccess(data) {
        toast.success('Submission accepted successfully')
        router.push("/my-submissions");
      },
      onError(error: any) {
        alert(error.request.response);
      },
    }
  );

  const { mutate: finish } = useMutation(
    async (id: number) => await finishSubmission(id),
    {
      onSuccess(data) {
        toast.success('Submission finished successfully')
        router.push("/my-submissions");
      },
      onError(error: any) {
        alert(error.request.response);
      },
    }
  );

  const {
    mutate: upload,
    isLoading,
  } = useMutation(async (obj: any) => await uploadFile(obj), {
    onSuccess(data) {
      console.log("success");
      setHavePrescription(true);
      setErrorMessage("")
      toast.success('Prescription uploaded successfully')
    },
    onError(error: any) {
      setErrorMessage(error.response.data.message);
    },
  });

  const {
    mutate: previewFile,
    isLoading: isPreviewLoading,
  } = useMutation(async (id: number) => await getUploadedFile(id), {
    onSuccess(data) {
      if (JSON.stringify(data.file).length > 125) {
        setPrescription(data.file.substring(0, 125) + "...");
      }else {
        setPrescription(data.file);
      }
      handlePrescriptionModal();
      console.log("success");
    },
    onError(error: any) {
      alert(error.request.response);
    },
  });

  const onSubmit = (data: any, id: number) => {
    const obj = { data: data.file_input[0], id: id };
    upload(obj);
  };

  const onChange = (e: any, id: number) => {
    const obj = { data: e.target.files[0], id: id };
    upload(obj);
  };

  const previewPrescription = (id: number) => {
    previewFile(id);
  };

  const handlePrescriptionModal = () => {
    setPrescriptionModal(!prescriptionModal);
  };

  const handleAcceptSubmission = (id: number) => {
    accept(id);
  };

  const handleFinishSubmission = (id: number) => {
    finish(id);
  };

  const downloadPrescription = (id: number) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      responseType: "blob",
    };

    axios
      .get(`http://localhost/api/download/${id}`, {
        headers,
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `prescription-${id}.txt`);
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <Sidebar>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white ">
        <div className="flex justify-between px-4 py-5 sm:px-6">
          <div>
            <span className="text-lg mr-3 leading-6 font-medium text-gray-900">
              {submission?.title}
            </span>
            <StatusBadge label={submission?.status}></StatusBadge>
          {role === "doctor" && (
            <div className="mt-2 text-sm text-gray-500">
              {submission?.patient?.name} • {submission?.created_at}
            </div>
          )}
          {role === "patient" && (
            <div className="mt-2 text-sm text-gray-500">
            {submission?.doctor?.name} {submission?.doctor && '•'} {submission?.created_at}
          </div>
    )}
            
          </div>
          {role === "doctor" && (
            <div className="self-end">
              {!submission?.doctor ? (
                <Button
                  label="Accept Submission"
                  disabled={false}
                  onClick={() => handleAcceptSubmission(submission.id)}
                />
              ) : submission.status === "in_progress" ? (
                <Button
                  label="Finish Submission"
                  disabled={false}
                  onClick={() => handleFinishSubmission(submission.id)}
                />
              ) : null}
            </div>
          )}
        </div>
        {/* EMAIL AND PHONE */}
        <div className="space-y-8 px-4 py-5 sm:p-6">
          <div className=" grid grid-cols-6">
            <div className=" items-center">
              <div className="text-gray-500 text-sm mb-2">Email address</div>
              <div className="font-normal text-gray-900">
                {submission?.patient?.email}
              </div>
            </div>
            <div className="items-center col-start-4 col-end-7">
              <div className=" text-sm text-gray-500 mb-2">Phone</div>
              <div className="font-normal text-gray-900">
                {submission?.patient?.info?.phone}
              </div>
            </div>
          </div>
          {/* OTHER INFO  */}

          <div className=" grid grid-cols-6">
            <div className="items-center col-start-1 col-end-7">
              <div className=" text-sm text-gray-500 mb-2">Other info</div>
              <div className="font-normal text-gray-900">
                {submission?.patient?.info?.info
                  ? submission?.patient?.info?.info
                  : "Not info provided"}
              </div>
            </div>
          </div>

          {/* Symptoms  */}

          <div className=" grid grid-cols-6 h-12">
            <div className="items-center col-start-1 col-end-7">
              <div className=" text-sm text-gray-500 mb-2">Symptoms</div>
              <div className="font-normal text-gray-900">
                {submission?.symptoms}
              </div>
            </div>
          </div>

          {/* Prescription  */}
          {role == "doctor" &&
            submission?.doctor &&
            !havePrescription &&
            !submission?.prescription && (
              //   <form onSubmit={handleSubmit(data => onSubmit(data, submission.id))}>
              //     <div className=" flex h-12">
              //       <div className="items-center col-start-1 col-end-3">
              //         <input
              //           className=" block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              //           id="file_input"
              //           type="file"
              //           required
              //           disabled={!submission?.doctor ? true : false}
              //           {...register("file_input")}
              //         />

              //       </div>
              //       <div className="w-32 ml-4 mr-6">
              //         <Button
              //           label="Upload"
              //           disabled={false}
              //         />
              //       </div>
              //       {isLoading ? <Spinner /> : null}

              //   </div>
              // </form>
              <input
                className=" block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                name="file_input"
                type="file"
                required
                onChange={(data) => onChange(data, submission.id)}
                disabled={!submission?.doctor ? true : false}
              />
            )}
          {isLoading ? <Spinner /> : null}

          {(havePrescription || submission?.prescription) && (
            <button
              onClick={() => previewPrescription(submission.id)}
              className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2"
            >
              {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg> */}
              <AiOutlineFileText size={22} />
              <span>Preview</span>
            </button>
          )}
          {isPreviewLoading && <Spinner />}
          {(errorMessage && !isLoading)  && (
                <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errorMessage}
                </span>
            )}

          {prescriptionModal && (
            <Modal
              title="Prescription preview:"
              icon={false}
              subId={submission.id}
              downloadPrescription={downloadPrescription}
              handlePrescriptionModal={handlePrescriptionModal}
              text={prescription}
              buttonText="Cerrar"
            />
          )}
        </div>

        {/* ACCEPT SUBMISSION TO ADD A DIAGNOSIS  */}
        {role === "doctor" ? (
          !submission?.doctor ? (
            <div className="mt-6 flex bg-blue-50 text-blue-800 p-3 rounded-md relative">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-800"
                aria-hidden="true"
              />
              <div className="ml-2">
                Accept the submission to add a diagnosis
              </div>
            </div>
          ) : null
        ) : (
          !submission?.prescription && (
            <div className="mt-6 flex bg-gray-100 text-gray-800 p-3 rounded-md relative">
              <TbForbid className="h-6 w-6 text-gray-800" aria-hidden="true" />
              <div className="ml-2">No prescriptions have been added yet</div>
            </div>
          )
        )}
      </div>
    </Sidebar>
  );
};

export default SubmissionPage;
