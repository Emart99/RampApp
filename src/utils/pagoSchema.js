import * as yup from "yup";

export const pagoValidationSchema = yup.object().shape({
  numero: yup
    .string()
    .min(16, "Ingrese una tarjeta válida")
    .max(19, "Ingrese una tarjeta válida")
    .required("Ingrese los números de la tarjeta"),
  nombre: yup.string().required("Ingrese el nombre del titular"),
  mes: yup.string().required("Ingrese la fecha de vencimiento"),
  cvv: yup
    .string()
    .min(3, "Ingrese un código de seguridad válido")
    .max(4, "Ingrese un código de seguridad válido")
    .required("Ingrese el código de seguridad"),
  dni: yup
    .string()
    .min(7, "Ingrese un DNI válido")
    .required("Ingrese el DNI del titular"),
});
