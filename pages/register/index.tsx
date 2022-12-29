import Link from "next/link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { IUserRegister } from '../../interfaces/index'
import { validationsRegister } from '../../utils/validations'
import axios from 'axios'
import Modal from '../../components/Modal'
import { useRouter } from "next/router";
import CheckBox from "../../components/CheckBox";



export default function Register() {
  const router = useRouter();

  const registerUser = async (user: IUserRegister) => {
    const response = await axios.post('http://localhost/api/register', user)
    return response.data
}

  const [error, setError] = useState({ email: '', name: '', password: '', confirm_password: '', role: '' })
  const [role, setRole] = useState('doctor')

  const cambioRadioRole = (e: any) => {
    setRole(e.target.value)
  }

  const methods = useForm<IUserRegister>({
    resolver: yupResolver(validationsRegister)
  })

  const disabledButton = !((methods.formState.errors?.email) == null) || !((methods.formState.errors?.name) == null) ||
    !((methods.formState.errors?.password) == null) || !((methods.formState.errors?.confirm_password) == null)

  const {
    mutate: registration,
    isLoading,
    isSuccess
  } = useMutation(async (user: IUserRegister) => await registerUser(user), {
    onSuccess (data) {
      //router.push('/login');
      console.log("login successful")
    },
    onError (error: any) {
      alert("error");
      setError(error.request.response)
    }
  })

  const onSubmit: SubmitHandler<IUserRegister> = (values) => {
    registration(values)
  }

  return (
    <>
    {isSuccess
      ?<Modal title='Email enviado' path='/login' text='Verifica tu casilla de entrada para confirmar tu email' buttonText='Iniciar sesion' subId={0} />
      :
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome to the doctor's app
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign up to access unique features
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST" noValidate>
              <div className=" grid grid-cols-6 grid-rows-3 gap-4">
                <div className=" items-center col-start-1 col-end-4">
                  <Input
                    name="name"
                    label="Name"
                    disabled={false}
                    type="text"
                    error={error.name}
                  />
                </div>
                <div className="items-center col-start-4 col-end-7">
                  <Input
                    name="email"
                    label="Email"
                    disabled={false}
                    type="text"
                    error={error.name}
                  />
                </div>
                <div className=" items-center col-start-1 col-end-4">
                  <Input
                    name="password"
                    label="Password"
                    disabled={false}
                    type="password"
                    error={error.name}
                  />
                </div>
                
                <div className="items-center col-start-4 col-end-7">
                  <Input
                    name="confirm_password"
                    label="Confirm Password"
                    disabled={false}
                    type="password"
                    error={error.name}
                  />
                </div>
                <div className="items-center col-start-1 col-end-4">
                  <CheckBox topMsg="User Type" label="Doctor" name="doctor"></CheckBox>
                </div>
                <div className="items-center col-start-4 col-end-7">
                  <CheckBox label="Patient" name="patient"></CheckBox>
                </div>
              </div>
              <div>
                <Button label="Sign up" disabled={disabledButton} isLoading={isLoading}></Button>
              </div>
            </form>
            </FormProvider>

            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Already have an account?
                    <span className="text-blue-800">
                      {" "}
                      <Link href="/login">Log in</Link>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}
