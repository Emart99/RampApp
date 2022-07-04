import * as yup from "yup";

export const rampaValidationSchema = yup.object().shape({
  calle: yup.string().required("Ingrese la calle del domicilio"),
  altura: yup
    .string()
    .max(5, "Ingrese un número de calle válido")
    .required("Ingrese el numero del domicilio"),
  localidad: yup.string().required("Ingrese la localidad"),
  partido: yup.string().required("Ingrese el partido"),
  cp: yup.string().required("Ingrese el código postal"),
  nroPartida: yup
    .string()
    .required("Ingrese el número de partida del inmueble"),
  imgRampa: yup.string().required("Foto requerida"),
  imgEscritura: yup.string().required("Foto requerida"),
  imgDNI: yup.string().required("Foto requerida"),
});
