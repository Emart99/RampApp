import * as yup from "yup";

export const vehiculoValidationSchema = yup.object().shape({
  marca: yup.string().required("Ingrese la marca"),
  modelo: yup.string().required("Ingrese el modelo"),
  dominio: yup.string()
  .min(6,"Ingese un dominio Valido")
  .max(7,"Ingrese un dominio Valido")
  .matches( "^[A-Z]{2}[0-9]{3}[A-Z]{2}$|^[A-Z]{3}[0-9]{3}$", "Ingrese un dominio Valido")
  .required("Ingrese el dominio"),
});
