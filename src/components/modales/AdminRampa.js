import React, { useState } from "react";
import {
  Text,
  IconButton,
  useTheme,
  Portal,
  Modal,
  Switch,
} from "react-native-paper";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import modalStyles from "../../styles/modalStyles";
import GlobalButton from "../GlobalButton";

const AdminRampa = (idRampa, visible, setVisible) => {
  const theme = useTheme();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [horaDesde, setHoraDesde] = useState(0);
  const [horaHasta, setHoraHasta] = useState(0);
  const hideModal = () => setVisible(false);
  const [visibleTimePickerD, setVisibleTimePickerD] = useState(false);
  const [visibleTimePickerH, setVisibleTimePickerH] = useState(false);

  const onConfirm = (date, func) => {
    setVisibleTimePickerD(false);
    setVisibleTimePickerH(false);
    func(date.getHours());
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <Portal theme={{colors:{backdrop:'rgba(0, 0, 0, 0.35)'}}}
    key={Math.random}>
      <Modal
        dismissable={false}
        key={idRampa}
        contentContainerStyle={[
          { backgroundColor: theme.colors.modal, height: 300 },
          modalStyles.modal,
        ]}
        animationType="fade"
        visible={visible}
      >
        <View style={modalStyles.headerContainer}>
          <Text style={modalStyles.tituloBold}>Administrar Rampa</Text>
          <IconButton
            icon="alert"
            color={theme.colors.text}
            onPress={() => console.log("zz")}
            size={30}
            style={{ marginTop: -10 }}
          />
        </View>
        <View style={modalStyles.gralContainer}>
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
                    style={{ padding: 0 }}
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
                  <Text style={{ fontSize: 18, color: theme.colors.text }}>
                    Hasta: {horaHasta} hs
                  </Text>
                  <IconButton
                    icon="clock-outline"
                    color={theme.colors.text}
                    onPress={() => setVisibleTimePickerH(true)}
                    size={40}
                    style={{ padding: 0 }}
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
            [{ borderColor: theme.colors.secondary }, modalStyles.button2],
            { color: theme.colors.text, textAlign: "center" },
            "Deshabilitar por motivos externos",
            hideModal
          )}
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
            hideModal
          )}
        </View>
      </Modal>
    </Portal>
  );
};
export default AdminRampa;
