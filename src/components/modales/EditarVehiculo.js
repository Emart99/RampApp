import React from "react";
import { Text, IconButton, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import {
  crearVehiculo,
  modificarVehiculo,
  traerVehiculo,
} from "../../api/http";
import { Formik } from "formik";

const EditarVehiculo = (
  visible,
  setVisible,
  theme,
  vehiculo,
  setOnPressRefresh,
  onPressRefresh
) => {
  const hideModal = () => setVisible(false);

  const vehiculoModificar = async (values) => {
    await modificarVehiculo(
      vehiculo.id,
      values.marca,
      values.modelo,
      values.dominio
    ).then((data) => {
      hideModal();
      setOnPressRefresh(!onPressRefresh);
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
          initialValues={{
            marca: vehiculo.marca,
            modelo: vehiculo.modelo,
            dominio: vehiculo.dominio,
          }}
          onSubmit={(values) => vehiculoModificar(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
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
                  theme.colors.modal,
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
                  theme.colors.modal,
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
                  theme.colors.modal,
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
                  "Agregar",
                  handleSubmit
                )}
              </View>
            </>
          )}
        </Formik>
      </Modal>
    </Portal>
  );
};

export default EditarVehiculo;
