import Link from "next/link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Modal from '../../components/Modal'
import CheckBox from "../../components/CheckBox";



export default function EmailAlreadyVerified() {
  return (
    <Modal title='Email ya se encuentra verificado' path='/login' text='Tu email se encuentra verificado!' buttonText='Iniciar sesion'/>
  );
}
