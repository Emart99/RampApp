import React, { useState } from "react";
import { Text, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import AwesomeAlert from 'react-native-awesome-alerts';

const PagoReserva = (visible, setVisible) => {
  const theme = useTheme();
  const hideModal = () => setVisible(false);
  const [showAlertDatosCorrectos,setShowAlertDatosCorrectos] = React.useState(false);
  const [showAlertDatosInvalidos,setShowAlertDatosInvalidos] = React.useState(false);
  const abonarHandler = () =>{
    setShowAlertDatosCorrectos(true)
    hideModal()
  }
  return (
    <Portal theme={{colors:{backdrop:'rgba(0, 0, 0, 0.35)'}}}>
      <AwesomeAlert
          titleStyle={{width:"100%",color:theme.colors.text}}
          contentContainerStyle={{backgroundColor:theme.colors.background}}
          show={showAlertDatosCorrectos}
          showProgress={false}
          title="Abonado correctamente!"
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#00DB6F"
          closeOnTouchOutside={false}
          onConfirmPressed={() => {
            setShowAlertDatosCorrectos(false)
            hideModal()
          }}
        />
        {/* ALERT DE REGISTRADO INCORRECTO */}
        <AwesomeAlert
          titleStyle={{width:"100%",color:theme.colors.text}}
          contentContainerStyle={{backgroundColor:theme.colors.background}}
          show={showAlertDatosInvalidos}
          showProgress={false}
          title="Error, problema con el pago!"
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Volver a introducir datos"
          confirmButtonColor="#DD6B55"
          closeOnTouchOutside={false}
          onConfirmPressed={() => {
            setShowAlertDatosInvalidos(false)
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
              { width: "40%", height: 45, marginRight: 25 },
              false,
              "number-pad"
            )}
            {GlobalInput(
              "Año",
              "",
              "setAnio",
              { width: "40%", height: 45 },
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
            abonarHandler
          )}
        </View>
      </Modal>
    </Portal>
  );
};

export default PagoReserva;
