import React from "react";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import { InformationCircleIcon, ArrowLongLeftIcon } from '@heroicons/react/20/solid'

const SubmissionDetailed = (): JSX.Element => {
  return (
    <Sidebar>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white ">
        <div className="flex justify-between px-4 py-5 sm:px-6">
          <div>
            <span className="text-lg mr-3 leading-6 font-medium text-gray-900">
              Submission Name
            </span>
            <div
              className={`inline-flex rounded-full bg-blue-100 text-blue-800 px-2 text-xs font-semibold leading-5`}
            >
              Pending
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Name of the patient • 22/22/22
            </div>
          </div>
          {/* <div className="float-right relative bottom-7">HOLA</div> */}
          <div className="self-end">
            <Button label="Accept Submission" disabled={false} />
          </div>
        </div>
        {/* EMAIL AND PHONE */}
        <div className="space-y-8 px-4 py-5 sm:p-6">
          <div className=" grid grid-cols-6">
            <div className=" items-center">
              <div className="text-gray-500 text-sm mb-2">Email address</div>
              <div className="font-normal text-gray-900">
                tommymcculloch@mail.com
              </div>
            </div>
            <div className="items-center col-start-4 col-end-7">
              <div className=" text-sm text-gray-500 mb-2">Phone</div>
              <div className="font-normal text-gray-900">+598 99680966</div>
            </div>
          </div>
          {/* OTHER INFO  */}

          <div className=" grid grid-cols-6">
            <div className="items-center col-start-1 col-end-7">
              <div className=" text-sm text-gray-500 mb-2">Other info</div>
              <div className="font-normal text-gray-900">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
                tempor incididunt ut labore et dolore magna aliqua labore et dolore magna aliqua
                tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>

          {/* Symptoms  */}

          <div className=" grid grid-cols-6 h-12">
            <div className="items-center col-start-1 col-end-7">
              <div className=" text-sm text-gray-500 mb-2">Symptoms</div>
              <div className="font-normal text-gray-900">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>

          {/* Prescription  */}
          <div className=" grid grid-cols-6 h-12">
            <div className="items-center col-start-1 col-end-7">
              <div className=" text-sm text-gray-500 mb-2">Prescription</div>
              <input
                className=" block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
              />
            </div>
          </div>
          
        </div>

        {/* ACCEPT SUBMISSION TO ADD A DIAGNOSIS  */}
        <div className="mt-6 flex bg-blue-50 text-blue-800 p-3 rounded-md relative">
            <InformationCircleIcon className="h-5 w-5 text-blue-800" aria-hidden="true" />
            <div className="ml-2">Accept the submission to add a diagnosis</div>
          </div>
      </div>
        

      
    </Sidebar>
  );
};

export default SubmissionDetailed;
