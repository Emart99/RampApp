import React from "react";
import { Text, IconButton, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import { crearVehiculo } from "../../api/http";
const CrearVehiculo = (visible, setVisible) => {
  const theme = useTheme();

  const hideModal = () => setVisible(false);
  const [marca,setMarca] = React.useState("")
  const [modelo,setModelo] = React.useState("")
  const [dominio,setDominio] = React.useState("")

  const vehiculoCrear = async () => {
    await crearVehiculo(marca,modelo,dominio).then(data => {
      setMarca("")
      setModelo("")
      setDominio("")
      hideModal()
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
        <View style={modalStyles.inputContainer}>
          <Text style={modalStyles.titulo}>Agregar Vehículo</Text>
          {GlobalInput(
            "Marca",
            marca,
            setMarca,
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Modelo",
            modelo,
            setModelo,
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Dominio",
            dominio,
            setDominio,
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
            vehiculoCrear
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export default CrearVehiculo;
