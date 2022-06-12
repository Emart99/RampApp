import React from "react";
import { Text, IconButton, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";

const CrearVehiculo = (visible, setVisible) => {
    const theme = useTheme();
  
    const hideModal = () => setVisible(false);
  
    return (
      <Portal>
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
              "",
              "setMarca",
              styles.inputView,
              false,
              "default"
            )}
            {GlobalInput(
              "Modelo",
              "",
              "setModelo",
              styles.inputView,
              false,
              "default"
            )}
            {GlobalInput(
              "Dominio",
              "",
              "setDominio",
              styles.inputView,
              false,
              "default"
            )}
            
          </View>
  
          <View style={modalStyles.buttonContainer}>
            {GlobalButton(
             [{borderColor:theme.colors.secondary,borderStyle:'solid',borderWidth:1},modalStyles.button],
              { color: theme.colors.text,textAlign:'center'  },
              "Cancelar",
              hideModal
            )}
            {GlobalButton([{backgroundColor:theme.colors.secondary},modalStyles.button], { color: theme.colors.secondaryText,textAlign:'center' }, "Agregar", hideModal)}
          </View>
        </Modal>
      </Portal>
    );
  };

  export default CrearVehiculo;