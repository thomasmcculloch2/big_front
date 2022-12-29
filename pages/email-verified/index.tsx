import Link from "next/link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Modal from '../../components/Modal'
import CheckBox from "../../components/CheckBox";



export default function EmailVerified() {
  return (
    <Modal title='Email verificado' path='/login' text='Tu email se ha verificado con exito!' buttonText='Iniciar sesion' />
  );
}
