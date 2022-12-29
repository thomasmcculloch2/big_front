import React, { Fragment, useState } from 'react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

interface ModalProps {
  title: string
  text: string
  buttonText: string
  success?: boolean
  path?: string
  handlePrescriptionModal?: () => void
  icon?: boolean
  downloadPrescription?: (id:number) => void
  subId?: number,
}

const Modal: React.FC<ModalProps> = ({
  title,
  text,
  buttonText,
  success = true,
  path,
  handlePrescriptionModal,
  icon = true,
  downloadPrescription,
  subId,
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(true)

  const onCloseModal = () => {
    setOpen(false);
    handlePrescriptionModal && handlePrescriptionModal();
    path && router.push(path);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div>
                  {icon && (
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-${success ? 'green' : 'red'}-100`}>
                    {success
                      ? <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                      : <ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />}
                  </div>
                  )}
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                      {title}
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  {downloadPrescription && (
                    <button onClick={() => downloadPrescription && downloadPrescription(subId && subId)} className=" mb-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold items-center inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base shadow-sm sm:text-sm">
                      <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                      <span>Download</span>
                  </button>
                  )}
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
                    onClick={() => onCloseModal()}
                  >
                    {buttonText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
