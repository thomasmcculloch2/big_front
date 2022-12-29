import * as yup from "yup";

export const validationsRegister = yup
  .object({
    name: yup
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido"),
    email: yup
      .string()
      .email("El formato del email es incorrecto")
      .required("Email es requerido"),
    password: yup
      .string()
      // .matches(
      //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      //     "La contraseña debe contener al menos: 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial."
      // )
      .required("Contraseña es requerida"),
    confirm_password: yup
      .string()
      .required("Por favor, confirma tu contraseña")
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
    type: yup
      .string()
      .required("El rol es requerido")
      .oneOf(["doctor", "patient"], "El rol debe ser doctor o patient"),
  })
  .required();

export const validationsLogin = yup
  .object({
    email: yup
      .string()
      .email("El formato del email es incorrecto")
      .required("Email es requerido"),
    password: yup.string().required("La contraseña es requerida"),
  })
  .required();

export const validationsRecoverPassword = yup
  .object({
    email: yup
      .string()
      .email("El formato del email es incorrecto")
      .required("Email es requerido"),
  })
  .required();

export const validationsNewSubmission = yup
  .object({
    title: yup
            .string()
            .required("Titulo es requerido")
            .min(3, "El titulo debe tener al menos 3 caracteres"),
    symptoms: yup
              .string()
              .required("Sintomas son requeridos")
              .min(10, "Los sintomas deben tener al menos 10 caracteres"),
              
  })
  .required();

export const validationsPatientInfo = yup
  .object({
    phone: yup.number().required("Phone es requerido"),
    weight: yup.number().required("Weight es requerido"),
    height: yup.number().required("Weight es requerido"),
    info: yup.string().required("Info es requerido"),
  })
  .required();
