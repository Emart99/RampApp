import * as yup from "yup";

export const vehiculoValidationSchema = yup.object().shape({
  marca: yup.string().required("Ingrese la marca"),
  modelo: yup.string().required("Ingrese el modelo"),
  dominio: yup.string().required("Ingrese el dominio"),
});
