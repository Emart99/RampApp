import * as yup from "yup";

export const pagoValidationSchema = yup.object().shape({
  numero: yup
    .string()
    .min(16, "Ingrese una tarjeta válida")
    .max(19, "Ingrese una tarjeta válida")
    .required("Ingrese los números de la tarjeta"),
  nombre: yup.string().required("Ingrese el nombre del titular"),
  mes: yup.string()
    .min(2, "Ingrese un mes valido")
    .max(2, "Ingrese un mes valido")
    .matches( "[1]{1}[0-2]{1}$|^[0]{1}[0-9]{1}$", "Ingrese un mes valido")
    .required("Ingrese la fecha de vencimiento"),
  anio: yup.string()
    .min(2, "Ingrese un año valido")
    .max(2, "Ingrese un año valido")
    .matches( "^[2]{1}[2-9]{1}$|[3-9]{1}[0-9]{1}$", "Ingrese un año valido")
    .required("Ingrese la fecha de vencimiento"),
  cvv: yup
    .string()
    .min(3, "Ingrese un código de seguridad válido")
    .max(4, "Ingrese un código de seguridad válido")
    .required("Ingrese el código de seguridad"),
  dni: yup
    .string()
    .min(7, "Ingrese un DNI válido")
    .max(8, "Ingrese un DNI válido")
    .required("Ingrese el DNI del titular"),
});
