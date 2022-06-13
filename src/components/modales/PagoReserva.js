import React, { useState } from "react";
import { Text, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";

const PagoReserva = (visible, setVisible) => {
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
          <Text style={modalStyles.titulo}>Datos de la Tarjeta</Text>
          {GlobalInput(
            "Número de tarjeta",
            "",
            "setNumero",
            styles.inputView,
            false,
            "number-pad"
          )}
          {GlobalInput(
            "Nombre del titular",
            "",
            "setNombre",
            styles.inputView,
            false,
            "default"
          )}
          <Text style={{ color: theme.colors.text, fontSize: 16 }}>
            Fecha de vencimiento
          </Text>
          <View style={modalStyles.fechaContainer}>
            {GlobalInput(
              "Mes",
              "",
              "setMes",
              { width: "25%", height: 45, marginRight: 25 },
              false,
              "number-pad"
            )}
            {GlobalInput(
              "Año",
              "",
              "setAnio",
              { width: "25%", height: 45 },
              false,
              "number-pad"
            )}
          </View>

          {GlobalInput(
            "Código de seguridad",
            "",
            "setCCV",
            styles.inputView,
            false,
            "number-pad"
          )}

          {GlobalInput(
            "DNI del titular",
            "",
            "setDNI",
            styles.inputView,
            false,
            "number-pad"
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
            "Abonar",
            hideModal
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export default PagoReserva;
