import * as yup from "yup";

export const horarioValidationSchema = yup.object().shape({
  horarioDesde: yup.number(),
  horarioHasta: yup
    .number()
    .min(1)
    .required("Ingrese el horario")
    .moreThan(
      yup.ref("horarioDesde"),
      "El horario de fin debe ser mayor a la hora de inicio"
    ),
});
