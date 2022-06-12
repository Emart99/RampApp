import React, { useState } from "react";
import { Text, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";

const PagoReserva = (visible, setVisible) => {
  const theme = useTheme();
  const [mes, setMes] = useState(0);
  const [anio, setAnio] = useState(0);
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
          <Text style={modalStyles.titulo}>Datos de la Tarjeta</Text>
          {GlobalInput(
            "Número de tarjeta",
            "",
            "setNumero",
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Código de seguridad",
            "",
            "setCCV",
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Nombre del titular",
            "",
            "setNombre",
            styles.inputView,
            false,
            "default"
          )}
          <Text>Inserte mes picker</Text>
          <Text>Inserte año picker</Text>
          
        </View>

        <View style={modalStyles.buttonContainer}>
          {GlobalButton(
            [
              {
                borderColor: theme.colors.secondary,
                borderStyle: "solid",
                borderWidth: 1,
              },
              modalStyles.button,
            ],
            { color: theme.colors.text, textAlign: "center" },
            "Cancelar",
            hideModal
          )}
          {GlobalButton(
            [{ backgroundColor: theme.colors.secondary }, modalStyles.button],
            { color: theme.colors.secondaryText, textAlign: "center" },
            "Abonar",
            hideModal
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export default PagoReserva;


