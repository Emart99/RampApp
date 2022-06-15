import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
    userName: yup.string().required("Ingrese el usuario"),
    contrasenia: yup.string().required("Ingrese la contraseña"),
  });
  