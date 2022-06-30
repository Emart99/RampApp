import React from "react";
import {
  Text,
  IconButton,
  Portal,
  Modal,
  Switch,
  TextInput,
} from "react-native-paper";
import { Alert, Button, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import { Chip } from "react-native-paper";

import modalStyles from "../../styles/modalStyles";
import GlobalButton from "../GlobalButton";
import {
  denunciarInfractor,
  deshabilitarRampa,
  habilitarRampa,
  subirImagen,
} from "../../api/http";
import { Formik } from "formik";
import styles from "../../styles/styles";
import { horarioValidationSchema } from "../../utils/horarioSchema";

const AdminRampa = (
  rampa,
  visible,
  setVisible,
  theme,
  isSwitchOn,
  setIsSwitchOn,
  visibleTimePicker,
  setVisibleTimePicker,
  horarios,
  setHorarios,
  onPressRefresh,
  setOnPressRefresh,
  showAlertDenuncia,
  setShowAlertDenuncia,
  visibleToast,
  setVisibleToast,
  dominioDenunciado,
  setDominioDenunciado,
  enviandoDenuncia,
  setEnviandoDenuncia,
  limitTime
) => {
  const hideModal = () => {
    setVisible(false);
    setHorarios([]);
    setOnPressRefresh(!onPressRefresh);
  };

  const editRampa = async () => {
    if (isSwitchOn) {
      if (horarios.length <= 0) {
        Alert.alert("", "Debe primero ingresar un horario");
        return;
      } else {
        await habilitarRampa(rampa.id, horarios).then(() =>
          setOnPressRefresh(!onPressRefresh)
        );
      }
    } else {
      await deshabilitarRampa(rampa.id).then(() =>
        setOnPressRefresh(!onPressRefresh)
      );
    }
    hideModal();
  };

  const onTogglePickerDesde = () =>
    setVisibleTimePicker({
      ...visibleTimePicker,
      desde: !visibleTimePicker.desde,
    });

  const onTogglePickerHasta = () =>
    setVisibleTimePicker({
      ...visibleTimePicker,
      hasta: !visibleTimePicker.hasta,
    });

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const onToggleSnackBar = () => setVisibleToast(!visibleToast);

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
    setEnviandoDenuncia(true);
    if (!result.cancelled) {
      const imagen = await subirImagen(result.base64).catch((err) => {});
      await denunciarInfractor(
        "Estacionamiento indebido",
        imagen.data.link,
        dominioDenunciado,
        `${rampa.calle} ${rampa.altura}`
      ).then((data) => {
        onToggleSnackBar();
      });
    }
    setDominioDenunciado("");
  };

  const check24h = (time) => {
    let hora = time.getHours();
    if (hora == 0) {
      hora = 24;
    }
    return hora;
  };

  const agregarHorario = (values) => {
    if (values.horarioDesde > 0 && values.horarioHasta > 0) {
      setHorarios([...horarios, values]);
    }
  };

  const eliminarHorario = (index) => {
    const newHorarios = [...horarios];
    newHorarios.splice(index, 1);
    setHorarios(newHorarios);
  };

  return (
    <Portal
      theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.35)" } }}
      key={Math.random}
    >
      <Modal
        dismissable={false}
        key={rampa.id}
        contentContainerStyle={[
          { backgroundColor: theme.colors.modal, height: 500 },
          modalStyles.modal,
        ]}
        animationType="fade"
        visible={visible}
      >
        <AwesomeAlert
          titleStyle={{
            width: "100%",
            textAlign: "center",
            color: theme.colors.text,
          }}
          contentContainerStyle={{ backgroundColor: theme.colors.modal }}
          confirmButtonTextStyle={{ color: theme.colors.secondaryText }}
          show={showAlertDenuncia}
          showProgress={enviandoDenuncia}
          title="Denunciar infractor"
          message={
            enviandoDenuncia
              ? "Por favor, espere..."
              : "Ingrese el dominio del infractor y luego saque una foto de la infracción"
          }
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Sacar foto"
          confirmButtonColor={theme.colors.secondary}
          onConfirmPressed={() => {
            enviarDenuncia().then(() => {
              setEnviandoDenuncia(false);
              setShowAlertDenuncia(false);
              onToggleSnackBar();
            });
          }}
          showCancelButton={true}
          cancelText="Cancelar"
          cancelButtonTextStyle={{ color: theme.colors.text }}
          cancelButtonStyle={{
            borderColor: theme.colors.secondary,
            borderWidth: 1,
            borderStyle: "solid",
          }}
          onCancelPressed={() => {
            setShowAlertDenuncia(false);
          }}
          closeOnTouchOutside={false}
          customView={
            <View
              style={{
                width: "100%",
                height: 20,
                marginTop: 25,
                marginBottom: 20,
                justifyContent: "center",
              }}
            >
              <TextInput
                theme={{
                  colors: {
                    placeholder: theme.colors.text,
                    background: theme.colors.background,
                  },
                }}
                underlineColor={theme.colors.text}
                activeUnderlineColor={theme.colors.text}
                style={{ backgroundColor: theme.colors.modal, fontSize: 12 }}
                mode="flat"
                label="Dominio a denunciar"
                value={dominioDenunciado}
                disabled={enviandoDenuncia}
                onChangeText={(value) => setDominioDenunciado(value)}
              />
            </View>
          }
        />

        <View style={modalStyles.gralContainer}>
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

          {isSwitchOn ? (
            <>
              {limitTime && (
                <Text
                  style={{ color: "red", alignSelf: "center", marginTop: -20 }}
                >
                  Limite de horarios alcanzado
                </Text>
              )}
              <Text
                style={[{ color: theme.colors.text }, modalStyles.textHorarios]}
              >
                Seleccionar horario para el día de hoy
              </Text>
              <Formik
                initialValues={{ horarioDesde: 0, horarioHasta: 0 }}
                validationSchema={horarioValidationSchema}
                onSubmit={(values, { resetForm }) => {
                  agregarHorario(values);
                  resetForm({ horarioDesde: 0, horarioHasta: 0 });
                }}
              >
                {({
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  isValid,
                  touched,
                }) => (
                  <>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: "center",
                      }}
                    >
                      <View style={[modalStyles.horariosContainer]}></View>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        {/* PICKER DESDE ... */}
                        <View style={{ marginRight: "5%" }}>
                          <Text
                            style={{ fontSize: 18, color: theme.colors.text }}
                          >
                            Desde: {values.horarioDesde}:00 hs
                          </Text>
                          <IconButton
                            icon="clock-outline"
                            color={theme.colors.text}
                            onPress={onTogglePickerDesde}
                            size={40}
                            style={{
                              padding: 0,
                              marginTop: -10,
                              alignSelf: "center",
                            }}
                            disabled={limitTime}
                          />
                          <DateTimePickerModal
                            isVisible={visibleTimePicker.desde}
                            mode="time"
                            onConfirm={(date) => {
                              onTogglePickerDesde();
                              const time = check24h(date);
                              setFieldValue("horarioDesde", time);
                              setFieldTouched("horarioDesde", true);
                            }}
                            onCancel={onTogglePickerDesde}
                            date={new Date()}
                            minuteInterval={30}
                          />
                        </View>
                        {/* ... PICKER DESDE*/}
                        {/* PICKER HASTA ... */}
                        <View style={{ marginLeft: "5%" }}>
                          <Text
                            style={{ fontSize: 18, color: theme.colors.text }}
                          >
                            Hasta: {values.horarioHasta}:00 hs
                          </Text>
                          <IconButton
                            icon="clock-outline"
                            color={theme.colors.text}
                            onPress={onTogglePickerHasta}
                            size={40}
                            style={{
                              padding: 0,
                              marginTop: -10,
                              alignSelf: "center",
                            }}
                            disabled={limitTime}
                          />
                          <DateTimePickerModal
                            isVisible={visibleTimePicker.hasta}
                            mode="time"
                            onConfirm={(date) => {
                              onTogglePickerHasta();
                              const time = check24h(date);
                              setFieldValue("horarioHasta", time);
                              setFieldTouched("horarioHasta", true);
                            }}
                            onCancel={onTogglePickerHasta}
                            date={new Date()}
                            minuteInterval={30}
                          />
                        </View>
                        {/* ... PICKER HASTA*/}
                      </View>
                    </View>
                    {errors.horarioHasta && touched.horarioHasta && (
                      <Text
                        style={{
                          marginTop: -10,
                          width: "60%",
                          textAlign: "center",
                          color: "red",
                          alignSelf: "center",
                        }}
                      >
                        {errors.horarioHasta}
                      </Text>
                    )}
                    <IconButton
                      icon="clock-plus-outline"
                      color={theme.colors.text}
                      onPress={handleSubmit}
                      size={30}
                      style={{
                        marginTop: -50,
                        padding: 0,
                        alignSelf: "flex-end",
                      }}
                      disabled={!isValid || limitTime}
                    />
                  </>
                )}
              </Formik>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  alignSelf: "center",
                  width: "100%",
                }}
              >
                {horarios.length > 0 && (
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      alignSelf: "center",
                      color: theme.colors.text,
                      // width: "80%",
                    }}
                  >
                    Horarios agregados, acepte para guardar cambios
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignSelf: "center",
                    width: "90%",
                  }}
                >
                  {horarios.map((item, index) => {
                    return (
                      <Chip
                        mode="outlined"
                        style={{
                          margin: 7,
                          width: "45%",
                          alignSelf: "center",
                          height: 30,
                        }}
                        textStyle={{ textAlign: "center" }}
                        theme={{ colors: { text: theme.colors.text } }}
                        key={index}
                        closeIcon="close"
                        onClose={() => eliminarHorario(index)}
                      >
                        {item.horarioDesde}:00 - {item.horarioHasta}:00
                      </Chip>
                    );
                  })}
                </View>
              </View>
            </>
          ) : (
            <View style={{ flex: 1 }}></View>
          )}
        </View>
        <View style={[modalStyles.buttonContainer, { flex: 0.3 }]}>
          {/* {GlobalButton(
            [{ borderColor: theme.colors.secondary , alignSelf:'flex-end'}, modalStyles.button2],
            { color: theme.colors.text, textAlign: "center" },
            "Deshabilitar por motivos externos",
            hideModal
          )} */}
          {GlobalButton(
            [
              { borderColor: theme.colors.secondary, alignSelf: "flex-end" },
              modalStyles.button,
            ],
            { color: theme.colors.text, textAlign: "center", fontSize: 18 },
            "Cancelar",
            hideModal
          )}
          {GlobalButton(
            [
              {
                backgroundColor: theme.colors.secondary,
                borderColor: theme.colors.secondary,
                alignSelf: "flex-end",
              },
              modalStyles.button,
            ],
            {
              color: theme.colors.secondaryText,
              textAlign: "center",
              fontSize: 18,
            },
            "Aceptar",
            editRampa
          )}
        </View>
      </Modal>
    </Portal>
  );
};
export default AdminRampa;
