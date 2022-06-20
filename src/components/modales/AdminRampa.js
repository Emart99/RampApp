import React from "react";
import {
  Text,
  IconButton,
  Portal,
  Modal,
  Switch,
  TextInput,
} from "react-native-paper";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import { Formik } from "formik";

import modalStyles from "../../styles/modalStyles";
import GlobalButton from "../GlobalButton";
import {
  denunciarInfractor,
  deshabilitarRampa,
  habilitarRampa,
  subirImagen,
} from "../../api/http";
import GlobalInput from "../GlobalInput";
import styles from "../../styles/styles";

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
  setVisibleToast,
  dominioDenunciado,
  setDominioDenunciado,
  enviandoDenuncia,
  setEnviandoDenuncia,
) => {
  const hideModal = () => setVisible(false);

  const editRampa = async () => {
    if (isSwitchOn) {
      let horarios = [];
      for (let i = 0; i < horaDesde.length; i++) {
        const hora = {
          horarioDesde: horaDesde[i],
          horarioHasta: horaHasta[i],
        };
        horarios.push(hora);
      }
       await habilitarRampa(rampa.id, horarios);
    } else {
        await deshabilitarRampa(rampa.id);
    }
    setOnPressRefresh(!onPressRefresh);
    hideModal();
  };

  const onConfirmD = (date, index) => {
    let lista = [...horaDesde];
    lista[index] = date.getHours();
    setHoraDesde(lista);
    setPickerDState(false, index);
  };

  const onConfirmH = (date, index) => {
    let lista = [...horaHasta];
    lista[index] = date.getHours();
    setHoraHasta(lista);
    setPickerHState(false, index);
  };

  const setPickerDState = (state, index) => {
    let lista = [...visibleTimePickerD];
    lista[index] = state;
    setVisibleTimePickerD(lista);
  };

  const setPickerHState = (state, index) => {
    let lista = [...visibleTimePickerH];
    lista[index] = state;
    setVisibleTimePickerH(lista);
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
          contentContainerStyle={{ backgroundColor: theme.colors.background }}
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
                width: "85%",
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
          {/* La mejor funcionalidad mejormente implementada */}
          {!isSwitchOn && <View style={{ flex: 1 }}></View>}
          {isSwitchOn && (
            <>
              <Text
                style={[{ color: theme.colors.text }, modalStyles.textHorarios]}
              >
                Seleccionar horario para el día de hoy
              </Text>
              <View
                style={{
                  flex: 1,
                  alignSelf: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <View style={[modalStyles.horariosContainer]}></View>
                {[0, 1, 2].map((index) => (
                  <View style={{ flex: 1, flexDirection: "row" }} key={index}>
                    {/* PICKER DESDE ... */}
                    <View style={{ marginRight: "5%" }}>
                      <Text style={{ fontSize: 18, color: theme.colors.text }}>
                        Desde: {horaDesde[index]} hs
                      </Text>
                      <IconButton
                        icon="clock-outline"
                        color={theme.colors.text}
                        onPress={() => {
                          setPickerDState(true, index);
                        }}
                        size={40}
                        style={{
                          padding: 0,
                          marginTop: -10,
                          alignSelf: "center",
                        }}
                      />
                      <DateTimePickerModal
                        isVisible={visibleTimePickerD[index]}
                        mode="time"
                        onConfirm={(date) => {
                          onConfirmD(date, index);
                        }}
                        onCancel={() => {
                          setPickerDState(false, index);
                        }}
                        date={new Date()}
                        minuteInterval={30}
                      />
                    </View>
                    {/* ... PICKER DESDE*/}
                    {/* PICKER HASTA ... */}
                    <View style={{ marginLeft: "5%" }}>
                      <Text style={{ fontSize: 18, color: theme.colors.text }}>
                        Hasta: {horaHasta[index]} hs
                      </Text>
                      <IconButton
                        icon="clock-outline"
                        color={theme.colors.text}
                        onPress={() => {
                          setPickerHState(true, index);
                        }}
                        size={40}
                        style={{
                          padding: 0,
                          marginTop: -10,
                          alignSelf: "center",}}
                      />
                      <DateTimePickerModal
                        isVisible={visibleTimePickerH[index]}
                        mode="time"
                        onConfirm={(date) => {
                          onConfirmH(date, index);
                        }}
                        onCancel={() => {
                          setPickerHState(false, index);
                        }}
                        date={new Date()}
                        minuteInterval={30}
                      />
                    </View>
                    {/* ... PICKER HASTA*/}
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
        <View style={modalStyles.buttonContainer}>
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

const init = {
  horaDesde1: 0,
  horaHasta1: 0,
  visible1: false,
  horaDesde2: 0,
  horaHasta2: 0,
  visible2: false,
  horaDesde3: 0,
  horaHasta3: 0,
  visible3: false,
};

const FormHorarios = ({
  theme,
  setVisibleTimePickerD,
  visibleTimePickerD,
  setVisibleTimePickerH,
  visibleTimePickerH,
}) => {
  return (
    <View style={[modalStyles.horariosContainer]}>
      <Formik initialValues={init} onSubmit={(values) => console.log(values)}>
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          setValues,
          resetForm,
          setFieldTouched,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            {/* PICKER DESDE ... */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ marginRight: "5%" }}>
                <Text style={{ fontSize: 18, color: theme.colors.text }}>
                  Desde: {values.horaDesde1} hs
                </Text>
                <IconButton
                  icon="clock-outline"
                  color={theme.colors.text}
                  onPress={() => {
                    setFieldValue("visible1", true);
                  }}
                  size={40}
                  style={{
                    padding: 0,
                    marginTop: -10,
                    alignSelf: "center",
                  }}
                />
                <DateTimePickerModal
                  isVisible={values.visible1}
                  mode="time"
                  onConfirm={(date) => {
                    resetForm();
                    // setValues(init);
                    setFieldValue("horaDesde1", date.getHours());
                    console.log(values.visible1);
                  }}
                  onCancel={() => {
                    resetForm();
                    console.log(values.visible1);
                  }}
                  date={new Date()}
                  minuteInterval={30}
                />
              </View>
              {/* ... PICKER DESDE*/}
              {/* PICKER HASTA ... */}
              <View style={{ marginLeft: "5%" }}>
                <Text style={{ fontSize: 18, color: theme.colors.text }}>
                  Hasta: hs
                </Text>
                <IconButton
                  icon="clock-outline"
                  color={theme.colors.text}
                  onPress={() => setVisibleTimePickerH(true)}
                  size={40}
                  style={{
                    padding: 0,
                    alignSelf: "center",
                    marginTop: -10,
                  }}
                />
                <DateTimePickerModal
                  isVisible={visibleTimePickerH}
                  mode="time"
                  // onConfirm={(date) => onConfirm(date, setHoraHasta)}
                  onCancel={() => setVisibleTimePickerH(false)}
                  date={new Date()}
                  minuteInterval={30}
                />
              </View>
            </View>
            {/* ... PICKER HASTA*/}

            {/* PICKER DESDE ... */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ marginRight: "5%" }}>
                <Text style={{ fontSize: 18, color: theme.colors.text }}>
                  Desde: hs
                </Text>
                <IconButton
                  icon="clock-outline"
                  color={theme.colors.text}
                  onPress={() => setVisibleTimePickerD(true)}
                  size={40}
                  style={{
                    padding: 0,
                    marginTop: -10,
                    alignSelf: "center",
                  }}
                />
                <DateTimePickerModal
                  isVisible={visibleTimePickerD}
                  mode="time"
                  // onConfirm={(date) => onConfirm(date, setHoraDesde)}
                  onCancel={() => setVisibleTimePickerD(false)}
                  date={new Date()}
                  minuteInterval={30}
                />
              </View>
              {/* ... PICKER DESDE*/}
              {/* PICKER HASTA ... */}
              <View style={{ marginLeft: "5%" }}>
                <Text style={{ fontSize: 18, color: theme.colors.text }}>
                  Hasta: hs
                </Text>
                <IconButton
                  icon="clock-outline"
                  color={theme.colors.text}
                  onPress={() => setVisibleTimePickerH(true)}
                  size={40}
                  style={{
                    padding: 0,
                    alignSelf: "center",
                    marginTop: -10,
                  }}
                />
                <DateTimePickerModal
                  isVisible={visibleTimePickerH}
                  mode="time"
                  // onConfirm={(date) => onConfirm(date, setHoraHasta)}
                  onCancel={() => setVisibleTimePickerH(false)}
                  date={new Date()}
                  minuteInterval={30}
                />
              </View>
            </View>
            {/* ... PICKER HASTA*/}
            {/* PICKER DESDE ... */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ marginRight: "5%" }}>
                <Text style={{ fontSize: 18, color: theme.colors.text }}>
                  Desde: hs
                </Text>
                <IconButton
                  icon="clock-outline"
                  color={theme.colors.text}
                  onPress={() => setVisibleTimePickerD(true)}
                  size={40}
                  style={{
                    padding: 0,
                    marginTop: -10,
                    alignSelf: "center",
                  }}
                />
                <DateTimePickerModal
                  isVisible={visibleTimePickerD}
                  mode="time"
                  // onConfirm={(date) => onConfirm(date, setHoraDesde)}
                  onCancel={() => setVisibleTimePickerD(false)}
                  date={new Date()}
                  minuteInterval={30}
                />
              </View>
              {/* ... PICKER DESDE*/}
              {/* PICKER HASTA ... */}
              <View style={{ marginLeft: "5%" }}>
                <Text style={{ fontSize: 18, color: theme.colors.text }}>
                  Hasta: hs
                </Text>
                <IconButton
                  icon="clock-outline"
                  color={theme.colors.text}
                  onPress={() => setVisibleTimePickerH(true)}
                  size={40}
                  style={{
                    padding: 0,
                    alignSelf: "center",
                    marginTop: -10,
                  }}
                />
                <DateTimePickerModal
                  isVisible={visibleTimePickerH}
                  mode="time"
                  // onConfirm={(date) => onConfirm(date, setHoraHasta)}
                  onCancel={() => setVisibleTimePickerH(false)}
                  date={new Date()}
                  minuteInterval={30}
                />
              </View>
            </View>
            {/* ... PICKER HASTA*/}
          </>
        )}
      </Formik>
    </View>
  );
};
