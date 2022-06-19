import React from "react";
import { Text, useTheme, Portal, Modal, } from "react-native-paper";
import { View } from "react-native";
import { Formik } from "formik";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import AwesomeAlert from "react-native-awesome-alerts";
import { pagoValidationSchema } from "../../utils/pagoSchema";
import { pagarCarrito } from "../../api/http";

const PagoReserva = (visible, setVisible) => {
  const theme = useTheme();
  const hideModal = () => setVisible(false);
  const [showAlertDatosCorrectos, setShowAlertDatosCorrectos] =
    React.useState(false);
  const [showAlertDatosInvalidos, setShowAlertDatosInvalidos] =
    React.useState(false);

  const abonarHandler = (values) => {
    pagarCarrito();
    setShowAlertDatosCorrectos(true);
    hideModal();
  };
  return (
    <Portal theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.35)" } }}>
      <AwesomeAlert
        titleStyle={{ width: "100%", color: theme.colors.text }}
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        show={showAlertDatosCorrectos}
        showProgress={false}
        title="Abonado correctamente!"
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#00DB6F"
        closeOnTouchOutside={false}
        onConfirmPressed={() => {
          setShowAlertDatosCorrectos(false);
          hideModal();
        }}
      />
      {/* ALERT DE REGISTRADO INCORRECTO */}
      <AwesomeAlert
        titleStyle={{ width: "100%", color: theme.colors.text }}
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        show={showAlertDatosInvalidos}
        showProgress={false}
        title="Error, problema con el pago!"
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Volver a introducir datos"
        confirmButtonColor="#DD6B55"
        closeOnTouchOutside={false}
        onConfirmPressed={() => {
          setShowAlertDatosInvalidos(false);
        }}
      />
      <Modal
        dismissable={false}
        contentContainerStyle={[
          { backgroundColor: theme.colors.modal },
          modalStyles.modal,
        ]}
        animationType="fade"
        visible={visible}
      >
        <Formik
          validationSchema={pagoValidationSchema}
          initialValues={{
            numero: "",
            nombre: "",
            mes: "",
            anio: "",
            cvv: "",
            dni: "",
          }}
          onSubmit={(values) => abonarHandler(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <View style={modalStyles.inputContainer}>
                <Text style={modalStyles.titulo}>Datos de la Tarjeta</Text>
                {GlobalInput(
                  "Número de tarjeta",
                  values.numero,
                  handleChange("numero"),
                  handleBlur("numero"),
                  styles.inputView,
                  theme.colors.modal,
                  false,
                  "number-pad"
                )}
                {errors.numero && touched.numero && (
                  <Text style={styles.inputInvalidText}>{errors.numero}</Text>
                )}
                {GlobalInput(
                  "Nombre del titular",
                  values.nombre,
                  handleChange("nombre"),
                  handleBlur("nombre"),
                  styles.inputView,
                  theme.colors.modal,
                  false,
                  "default"
                )}
                {errors.nombre &&  touched.nombre && (
                  <Text style={styles.inputInvalidText}>{errors.nombre}</Text>
                )}
                <Text style={{ color: theme.colors.text, fontSize: 16, marginTop:10 }}>
                  Fecha de vencimiento
                </Text>
                <View style={modalStyles.fechaContainer}>
                  {GlobalInput(
                    "Mes",
                    values.mes,
                    handleChange("mes"),
                    handleBlur("mes"),
                    { width: "40%", height: 45, marginRight: 25 },
                    theme.colors.modal,
                    false,
                    "number-pad"
                  )}
                  {GlobalInput(
                    "Año",
                    values.anio,
                    handleChange("anio"),
                    handleBlur("anio"),
                    { width: "40%", height: 45 },
                    theme.colors.modal,
                    false,
                    "number-pad"
                  )}
                </View>
                {errors.mes &&  touched.mes && (
                    <Text style={styles.inputInvalidText}>{errors.mes}</Text>
                  )}
                {GlobalInput(
                  "Código de seguridad",
                  values.cvv,
                  handleChange("cvv"),
                  handleBlur("cvv"),
                  styles.inputView,
                  theme.colors.modal,
                  false,
                  "number-pad"
                )}
                {errors.cvv &&  touched.cvv && (
                  <Text style={styles.inputInvalidText}>{errors.cvv}</Text>
                )}

                {GlobalInput(
                  "DNI del titular",
                  values.dni,
                  handleChange("dni"),
                  handleBlur("dni"),
                  styles.inputView,
                  theme.colors.modal,
                  false,
                  "number-pad"
                )}
                {errors.dni &&  touched.dni && (
                  <Text style={styles.inputInvalidText}>{errors.dni}</Text>
                )}
              </View>

              <View style={modalStyles.buttonContainer}>
                {GlobalButton(
                  [
                    {
                      borderColor: theme.colors.secondary,
                    },
                    modalStyles.button,
                  ],
                  { color: theme.colors.text, textAlign: "center",fontSize:18, },
                  "Cancelar",
                  hideModal
                )}
                {GlobalButton(
                  [
                    {
                      backgroundColor: theme.colors.secondary,
                      borderColor: theme.colors.secondary,
                    },
                    modalStyles.button,
                  ],
                  { color: theme.colors.secondaryText, textAlign: "center" ,fontSize:18,},
                  "Abonar",
                  handleSubmit,
                  isValid
                )}
              </View>
            </>
          )}
        </Formik>
      </Modal>
    </Portal>
  );
};

export default PagoReserva;
