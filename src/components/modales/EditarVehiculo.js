import React from "react";
import { Text, IconButton, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import { crearVehiculo, modificarVehiculo, traerVehiculo } from "../../api/http";
import { Formik } from 'formik';

const EditarVehiculo = (visible, setVisible,theme,vehiculo,setOnPressRefresh,onPressRefresh) => {
  

  const hideModal = () => setVisible(false);

  const vehiculoModificar  = async (values) => {
    await modificarVehiculo(vehiculo.id,values.marca,values.modelo,values.dominio).then(data => {
      hideModal()
      setOnPressRefresh(!onPressRefresh)
    })
  }


  return (
    <Portal theme={{colors:{backdrop:'rgba(0, 0, 0, 0.35)'}}}>
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
          initialValues={{ marca: vehiculo.marca, modelo: vehiculo.modelo, dominio: vehiculo.dominio }}
          onSubmit={(values) => vehiculoModificar(values)}
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
            "",
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Modelo",
            values.modelo,
            handleChange("modelo"),
            "",
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Dominio",
            values.dominio,
            handleChange("dominio"),
            "",
            styles.inputView,
            false,
            "default"
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
            handleSubmit
          )}
        </View>
        </>)}
        </Formik>
      </Modal>
    </Portal>
  );
};

export default EditarVehiculo;
