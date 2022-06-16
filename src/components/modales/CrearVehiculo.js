import React from "react";
import { Text, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";
import { Formik } from "formik";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import { crearVehiculo } from "../../api/http";
import { vehiculoValidationSchema } from "../../utils/vehiculoSchema";

const CrearVehiculo = (visible, setVisible) => {
  const theme = useTheme();
  const hideModal = () => setVisible(false);

  const vehiculoCrear = async (values) => {
    await crearVehiculo(values).then(() => {
      hideModal();
    });
  };

  return (
    <Portal theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.35)" } }}>
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
          validationSchema={vehiculoValidationSchema}
          initialValues={{ marca: "", modelo: "", dominio: "" }}
          onSubmit={(values) => vehiculoCrear(values)}
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
                <Text style={modalStyles.titulo}>Agregar Vehículo</Text>

                {GlobalInput(
                  "Marca",
                  values.marca,
                  handleChange("marca"),
                  handleBlur("marca"),
                  styles.inputView,
                  false,
                  "default"
                )}
                {errors.marca && touched.marca && (
                  <Text style={styles.inputInvalidText}>{errors.marca}</Text>
                )}
                {GlobalInput(
                  "Modelo",
                  values.modelo,
                  handleChange("modelo"),
                  handleBlur("modelo"),
                  styles.inputView,
                  false,
                  "default"
                )}
                {errors.modelo && touched.modelo && (
                  <Text style={styles.inputInvalidText}>{errors.modelo}</Text>
                )}
                {GlobalInput(
                  "Dominio",
                  values.dominio,
                  handleChange("dominio"),
                  handleBlur("dominio"),
                  styles.inputView,
                  false,
                  "default"
                )}
                {errors.dominio && touched.dominio && (
                  <Text style={styles.inputInvalidText}>{errors.dominio}</Text>
                )}
              </View>
              <View style={modalStyles.buttonContainer}>
                {GlobalButton(
                  [{ borderColor: theme.colors.secondary }, modalStyles.button],
                  { color: theme.colors.text, textAlign: "center" },
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
                  { color: theme.colors.secondaryText, textAlign: "center" },
                  "Agregar",
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

export default CrearVehiculo;
