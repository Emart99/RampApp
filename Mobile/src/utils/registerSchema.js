import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  nombre: yup.string().required("Ingrese el nombre"),
  apellido: yup.string().required("Ingrese el apellido"),
  dni: yup.string().min(7, "Ingrese un DNI válido").required("Ingrese el DNI"),
  userName: yup.string().required("Ingrese el usuario"),
  contrasenia: yup.string().required("Ingrese la contraseña"),
  confirmarContrasenia: yup
    .string()
    .oneOf([yup.ref("contrasenia")], "Las contraseñas no coinciden")
    .required("Ingrese la contraseña"),
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Ingrese el email"),
});
