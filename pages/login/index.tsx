import Link from "next/link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom'
import { IUserLogin } from '../../interfaces/index'
import { validationsLogin } from '../../utils/validations'
import axios from 'axios'
import { AuthContext } from '../../context'
import { useRouter } from "next/router";



export default function Login() {

  const { saveUser } = useContext(AuthContext);
  const router = useRouter();

  const loginUser = async (user: IUserLogin) => {
    const response = await axios.post('http://localhost/api/login', user)
    return response.data
}

  //const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const methods = useForm<IUserLogin>({
    resolver: yupResolver(validationsLogin)
  })

  const disabledButton = !((methods.formState.errors?.email) == null) || !((methods.formState.errors?.password) == null)

  const {
    mutate: login,
    isLoading
  } = useMutation(async (user: IUserLogin) => await loginUser(user), {
    onSuccess (data) {
      localStorage.setItem('token', data.token)
      saveUser(data.user)
      data.user.roles[0].name === 'doctor' ? router.push('/doctor-table') : router.push('/my-submissions');
    },
    onError (error: any) {
    setErrorMessage(error.response.data.message)

    }
  })

  const onSubmit: SubmitHandler<IUserLogin> = (values) => {
    setErrorMessage('')
    login(values)
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome to the doctor's app
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Log in to access unique features
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4" action="#" method="POST" noValidate>
              <Input
                name="email"
                label="Email address"
                disabled={false}
                type="text"
              />
              <Input
                name="password"
                label="Password"
                disabled={false}
                type="password"
              />
              <div className="flex items-center justify-between">
              </div>
              <div>
                <Button label="Sign in" disabled={disabledButton} isLoading={isLoading}></Button>
              </div>
            </form>
            <p className='text-center mt-2 text-sm'>
              <span className='mt-2 text-sm text-red-600 dark:text-red-500'>{errorMessage}</span>
            </p>
            </FormProvider>


            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Dont't have an account yet?
                    <span className="text-blue-800">
                      {" "}
                      <Link href="/register">Sign up</Link>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
