import React from "react";
import {
  Text,
  IconButton,
  Portal,
  Modal,
  Switch,
} from "react-native-paper";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AwesomeAlert from "react-native-awesome-alerts";

import modalStyles from "../../styles/modalStyles";
import GlobalButton from "../GlobalButton";
import { denunciarInfractor, modificarRampa, subirImagen } from "../../api/http";

const AdminRampa = (
  rampa,
  visible,
  setVisible,
  theme,
  isSwitchOn,
  setIsSwitchOn,
  horaDesde,
  setHoraDesde,
  horaHasta,
  setHoraHasta,
  visibleTimePickerD,
  setVisibleTimePickerD, 
  visibleTimePickerH,
  setVisibleTimePickerH,
  onPressRefresh,
  setOnPressRefresh,
  showAlertDenuncia,
  setShowAlertDenuncia,
  visibleToast, 
  setVisibleToast
) => {
  
  const hideModal = () => setVisible(false);

  const editRampa = async () =>{
   // a implementar const modifRampa = await modificarRampa(rampa,horaDesde,horaHasta,isSwitchOn).then(data => hideModal())
  }

  const onConfirm = (date, func) => {
    setVisibleTimePickerD(false);
    setVisibleTimePickerH(false);
    func(date.getHours());
    setOnPressRefresh(onPressRefresh)
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const enviarDenuncia = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se necesitan permisos para usar la cámara");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.cancelled) {
      const imagen = await subirImagen(result.base64).catch((err) => {});
      await denunciarInfractor("Estacionamiento indebido", imagen.data.link,"",`${rampa.calle} ${rampa.altura}`).then(data => {setVisible(false);onToggleSnackBar()})
    }
  }

  const onToggleSnackBar = () => setVisibleToast(!visibleToast);

  return (
    <Portal
      theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.35)" } }}
      key={Math.random}
    >
      <Modal
        dismissable={false}
        key={rampa.id}
        contentContainerStyle={[
          { backgroundColor: theme.colors.modal, height: 300 },
          modalStyles.modal,
        ]}
        animationType="fade"
        visible={visible}
      >
        <AwesomeAlert
            titleStyle={{ width: "100%",textAlign:'center', color: theme.colors.text }}
            contentContainerStyle={{ backgroundColor: theme.colors.background }}
            confirmButtonTextStyle={{color:theme.colors.secondaryText}}
            show={showAlertDenuncia}
            showProgress={false}
            title="Denunciar infractor"
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Sacar foto"
            confirmButtonColor={theme.colors.secondary}
            closeOnTouchOutside={false}
            onConfirmPressed={() => {
              enviarDenuncia();
              setShowAlertDenuncia(false);
            }}
          />
        <View style={modalStyles.headerContainer}>
          <Text style={modalStyles.tituloBold}>Administrar Rampa</Text>
          <IconButton
            icon="alert"
            color={theme.colors.text}
            onPress={() => setShowAlertDenuncia(true)}
            size={30}
            style={{ marginTop: -10 }}
          />
        </View>
        <View style={[{marginBottom:10},modalStyles.gralContainer]}>
          <View style={modalStyles.switchContainer}>
            <Text style={{ fontSize: 18, color: theme.colors.text }}>
              {isSwitchOn ? "Habilitada" : "Deshabilitada"}
            </Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              style={modalStyles.switch}
            />
          </View>
          {/* La mejor funcionalidad mejormente implementada */}
          {!isSwitchOn && (
            <View style={{ marginBottom: 50, marginTop: 50 }}></View>
          )}
          {isSwitchOn && (
            <>
              <Text
                style={[{ color: theme.colors.text }, modalStyles.textHorarios]}
              >
                Seleccionar horario para el día de hoy
              </Text>
              <View style={modalStyles.horariosContainer}>
                <View>
                  <Text style={{ fontSize: 18, color: theme.colors.text }}>
                    Desde: {horaDesde} hs
                  </Text>
                  <IconButton
                    icon="clock-outline"
                    color={theme.colors.text}
                    onPress={() => setVisibleTimePickerD(true)}
                    size={40}
                    style={{ padding: 0 ,marginTop:-10}}
                  />
                  <DateTimePickerModal
                    isVisible={visibleTimePickerD}
                    mode="time"
                    onConfirm={(date) => onConfirm(date, setHoraDesde)}
                    onCancel={() => setVisibleTimePickerD(false)}
                    date={new Date()}
                    minuteInterval={30}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 18, color: theme.colors.text}}>
                    Hasta: {horaHasta} hs
                  </Text>
                  <IconButton
                    icon="clock-outline"
                    color={theme.colors.text}
                    onPress={() => setVisibleTimePickerH(true)}
                    size={40}
                    style={{ padding: 0 ,marginTop:-10}}
                  />
                  <DateTimePickerModal
                    isVisible={visibleTimePickerH}
                    mode="time"
                    onConfirm={(date) => onConfirm(date, setHoraHasta)}
                    onCancel={() => setVisibleTimePickerH(false)}
                    date={new Date()}
                    minuteInterval={30}
                  />
                </View>
              </View>
            </>
          )}
        </View>
        <View style={modalStyles.buttonContainer}>
          {GlobalButton(
            [{ borderColor: theme.colors.secondary , alignSelf:'flex-end'}, modalStyles.button2],
            { color: theme.colors.text, textAlign: "center" },
            "Deshabilitar por motivos externos",
            hideModal
          )}
          {GlobalButton(
            [{ borderColor: theme.colors.secondary, alignSelf:'flex-end' }, modalStyles.button],
            { color: theme.colors.text, textAlign: "center" },
            "Cancelar",
            hideModal
          )}
          {GlobalButton(
            [
              {
                backgroundColor: theme.colors.secondary,
                borderColor: theme.colors.secondary,
                 alignSelf:'flex-end'
              },
              modalStyles.button,
            ],
            { color: theme.colors.secondaryText, textAlign: "center" },
            "Agregar",
            editRampa
          )}
        </View>
      </Modal>
    </Portal>
  );
};
export default AdminRampa;
