import React, { useState } from "react";
import {
  Text,
  IconButton,
  useTheme,
  Portal,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Formik } from "formik";
import AwesomeAlert from "react-native-awesome-alerts";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import { creacionDeRampa, geocoder, subirImagen, verificarPropiedadRampa } from "../../api/http";
import { rampaValidationSchema } from "../../utils/rampaSchema";

const CrearRampa = (
  visible,
  setVisible,
  theme,
  showAlertDatosCorrectos,
  setShowAlertDatosCorrectos,
  showAlertDatosInvalidos,
  setShowAlertDatosInvalidos,
  visibleLoading,
  setVisibleLoading,
  camaraDisabled,
  setCamaraDisabled,
  showAlertRampaRegistrada,
  setShowAlertRampaRegistrada,
  jsonRampaRegistrada,
  setJsonRampaRegistrada
) => {
  const pickImage = async (setFieldValue, setFieldTouched, imgValue) => {
    setCamaraDisabled(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
    });
    setImage(setFieldValue, setFieldTouched, imgValue, result);
  };

  const openCamera = async (setFieldValue, setFieldTouched, imgValue) => {
    setCamaraDisabled(true);
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se necesitan permisos para usar la cámara");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: true,
    });
    setImage(setFieldValue, setFieldTouched, imgValue, result);
  };

  const setImage = (setFieldValue, setFieldTouched, imgValue, result) => {
    if (!result.cancelled) {
      setFieldValue(imgValue, result.base64);
      setFieldTouched(imgValue, true);
    }
    setCamaraDisabled(false);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const agregarRampa = async (values) => {
    const imagenRampa = await subirImagen(values.imgRampa).catch((err) => {});
    const imagenDNI = await subirImagen(values.imgDNI).catch((err) => {});
    const imagenEscritura = await subirImagen(values.imgEscritura).catch(
      (err) => {}
    );
    
    const geoJson = await geocoder({
      altura: values.altura,
      calle: values.calle,
      localidad: values.localidad,
      partido: values.partido,
      codigopostal: values.cp,
    });

    if (geoJson[0] == undefined) {
      setVisibleLoading(false);
      return setShowAlertDatosInvalidos(true);
    }
    const rampaJSON = {
      posy: geoJson[0].lon,
      posx: geoJson[0].lat,
      calle: values.calle,
      altura: values.altura,
      nroPartidaInmobiliaria: values.nroPartida,
      imagenRampa: imagenRampa.data.link,
      imagenDni: imagenDNI.data.link,
      imagenEscritura: imagenEscritura.data.link,
    };
    creacionDeRampa(rampaJSON).then(()=>setShowAlertDatosCorrectos(true)).catch((err) => {
      setJsonRampaRegistrada(rampaJSON);
      setShowAlertRampaRegistrada(true);
    });

    setVisibleLoading(false);
  };

  const verificarRampa = async () => {
    await verificarPropiedadRampa(jsonRampaRegistrada).then((res) => {
      
    });
  }

  return (
    <Portal theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.35)" } }}>
      <AwesomeAlert
        titleStyle={{ width: "100%", color: theme.colors.text }}
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        show={showAlertDatosCorrectos}
        showProgress={false}
        title="Registrada correctamente!"
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#00DB6F"
        closeOnTouchOutside={false}
        onConfirmPressed={() => {
          setShowAlertDatosCorrectos(false);
          hideModal();
        }}
      />
      {/* ALERT DE REGISTRADO INCORRECTO */}
      <AwesomeAlert
        titleStyle={{ width: "100%", color: theme.colors.text }}
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        show={showAlertDatosInvalidos}
        showProgress={false}
        title="La direccion no fue encontrada!"
        message="Por favor, verifique que los datos ingresados sean correctos y vuelva a intentarlo"
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Volver a intentar"
        confirmButtonColor="#DD6B55"
        closeOnTouchOutside={false}
        onConfirmPressed={() => {
          setShowAlertDatosInvalidos(false);
        }}
      />
      {/* ALERT DE PARTIDA YA REGISTRADA */}
      <AwesomeAlert
        titleStyle={{ width: "100%", color: theme.colors.text }}
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        show={showAlertRampaRegistrada}
        showProgress={false}
        title="La rampa ya se encuentra registrada"
        message="Desea que verifiquemos la propiedad de la rampa?"
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        cancelText="Cancelar"
        confirmButtonTextStyle={{ color: theme.colors.secondaryText }}
        confirmButtonColor={theme.colors.secondary}
        closeOnTouchOutside={false}
        onConfirmPressed={() => {
          verificarRampa();
          setShowAlertRampaRegistrada(false);
          setJsonRampaRegistrada({});
          setShowAlertDatosCorrectos(true);
        }}
        cancelButtonTextStyle={{ color: theme.colors.text }}
        cancelButtonStyle={{
          borderColor: theme.colors.secondary,
          borderWidth: 1,
          borderStyle: "solid",
        }}
        showCancelButton={true}
        onCancelPressed={() => {
          setShowAlertRampaRegistrada(false);
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
        <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Formik
              validationSchema={rampaValidationSchema}
              initialValues={{
                calle: "",
                altura: "",
                localidad:"",
                partido: "",
                cp: "",
                nroPartida: "",
                imgRampa: "",
                imgEscritura: "",
                imgDNI: "",
              }}
              onSubmit={(values) => {
                setVisibleLoading(true);
                agregarRampa(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                isValid,
                touched,
              }) => (
                <>
                  <View style={modalStyles.inputContainer}>
                    <Text style={modalStyles.titulo}>Agregar Rampa</Text>
                    {GlobalInput(
                      "Calle",
                      values.calle,
                      handleChange("calle"),
                      handleBlur("calle"),
                      styles.inputView,
                      theme.colors.modal,
                      false,
                      "default"
                    )}
                    {errors.calle && touched.calle && (
                      <Text style={styles.inputInvalidText}>
                        {errors.calle}
                      </Text>
                    )}
                    {GlobalInput(
                      "Altura",
                      values.altura,
                      handleChange("altura"),
                      handleBlur("altura"),
                      styles.inputView,
                      theme.colors.modal,
                      false,
                      "number-pad"
                    )}
                    {errors.altura && touched.altura && (
                      <Text style={styles.inputInvalidText}>
                        {errors.altura}
                      </Text>
                    )}
                    {GlobalInput(
                      "Localidad",
                      values.localidad,
                      handleChange("localidad"),
                      handleBlur("localidad"),
                      styles.inputView,
                      theme.colors.modal,
                      false,
                      "default"
                    )}
                    {errors.localidad && touched.localidad && (
                      <Text style={styles.inputInvalidText}>
                        {errors.localidad}
                      </Text>
                    )}
                    {GlobalInput(
                      "Partido",
                      values.partido,
                      handleChange("partido"),
                      handleBlur("partido"),
                      styles.inputView,
                      theme.colors.modal,
                      false,
                      "default"
                    )}
                    {errors.partido && touched.partido && (
                      <Text style={styles.inputInvalidText}>
                        {errors.partido}
                      </Text>
                    )}
                    {GlobalInput(
                      "Código Postal",
                      values.cp,
                      handleChange("cp"),
                      handleBlur("cp"),
                      styles.inputView,
                      theme.colors.modal,
                      false,
                      "number-pad"
                    )}
                    {errors.cp && touched.cp && (
                      <Text style={styles.inputInvalidText}>{errors.cp}</Text>
                    )}
                    {GlobalInput(
                      "Número de partida inmobiliaria",
                      values.nroPartida,
                      handleChange("nroPartida"),
                      handleBlur("nroPartida"),
                      styles.inputView,
                      theme.colors.modal,
                      false,
                      "number-pad"
                    )}
                    {errors.nroPartida && touched.nroPartida && (
                      <Text style={styles.inputInvalidText}>
                        {errors.nroPartida}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text style={styles.inputValidImg}>
                      {errors.imgRampa && touched.imgRampa && errors.imgRampa}
                    </Text>
                    <Text style={styles.inputValidImg}>
                      {errors.imgDNI && touched.imgDNI && errors.imgDNI}
                    </Text>
                    <Text style={styles.inputValidImg}>
                      {errors.imgEscritura &&
                        touched.imgEscritura &&
                        errors.imgEscritura}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text style={styles.inputImgSubida}>
                      {values.imgRampa && !errors.imgRampa && "Rampa subida"}
                    </Text>
                    <Text style={styles.inputImgSubida}>
                      {values.imgDNI && !errors.imgDNI && "DNI subido"}
                    </Text>
                    <Text style={styles.inputImgSubida}>
                      {values.imgEscritura &&
                        !errors.imgEscritura &&
                        "Escritura subida"}
                    </Text>
                  </View>
                  <View style={modalStyles.imgInputsContainer}>
                    <View style={[modalStyles.imgContainer]}>
                      <Text style={modalStyles.textStyle}>Foto Rampa</Text>
                      <Text style={modalStyles.textStyle}>Foto DNI</Text>
                      <Text style={modalStyles.textStyle}>Foto Escritura</Text>
                    </View>
                    <View style={modalStyles.imgContainer}>
                      <View style={modalStyles.ctn}>
                        <IconButton
                          disabled={camaraDisabled}
                          icon="image-plus"
                          color={theme.colors.text}
                          onPress={() =>
                            pickImage(
                              setFieldValue,
                              setFieldTouched,
                              "imgRampa"
                            )
                          }
                          style={{ margin: 0, padding: 0 }}
                          size={27}
                        />
                        <IconButton
                          disabled={camaraDisabled}
                          icon="camera"
                          color={theme.colors.text}
                          onPress={() =>
                            openCamera(
                              setFieldValue,
                              setFieldTouched,
                              "imgRampa"
                            )
                          }
                          style={{ margin: 0, padding: 0 }}
                          size={28}
                        />
                      </View>
                      <View style={modalStyles.ctn}>
                        <IconButton
                          disabled={camaraDisabled}
                          icon="image-plus"
                          color={theme.colors.text}
                          onPress={() =>
                            pickImage(setFieldValue, setFieldTouched, "imgDNI")
                          }
                          style={{ margin: 0, padding: 0 }}
                          size={27}
                        />
                        <IconButton
                          disabled={camaraDisabled}
                          icon="camera"
                          color={theme.colors.text}
                          onPress={() =>
                            openCamera(setFieldValue, setFieldTouched, "imgDNI")
                          }
                          style={{ margin: 0, padding: 0 }}
                          size={28}
                        />
                      </View>
                      <View style={modalStyles.ctn}>
                        <IconButton
                          disabled={camaraDisabled}
                          icon="image-plus"
                          color={theme.colors.text}
                          onPress={() =>
                            pickImage(
                              setFieldValue,
                              setFieldTouched,
                              "imgEscritura"
                            )
                          }
                          style={{ margin: 0, padding: 0 }}
                          size={27}
                        />
                        <IconButton
                          disabled={camaraDisabled}
                          icon="camera"
                          color={theme.colors.text}
                          onPress={() =>
                            openCamera(
                              setFieldValue,
                              setFieldTouched,
                              "imgEscritura"
                            )
                          }
                          style={{ margin: 0, padding: 0 }}
                          size={28}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={modalStyles.buttonContainer}>
                    {GlobalButton(
                      [
                        { borderColor: theme.colors.secondary },
                        modalStyles.button,
                      ],
                      {
                        color: theme.colors.text,
                        textAlign: "center",
                        fontSize: 18,
                      },
                      "Cancelar",
                      hideModal
                    )}
                    <ActivityIndicator
                      size="large"
                      animating={visibleLoading}
                      hidesWhenStopped={true}
                      color={theme.colors.text}
                    />
                    {GlobalButton(
                      [
                        {
                          backgroundColor: theme.colors.secondary,
                          borderColor: theme.colors.secondary,
                        },
                        modalStyles.button,
                      ],
                      {
                        color: theme.colors.secondaryText,
                        textAlign: "center",
                        fontSize: 18,
                      },
                      "Agregar",
                      handleSubmit,
                      isValid
                    )}
                  </View>
                </>
              )}
            </Formik>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </Modal>
    </Portal>
  );
};

export default CrearRampa;
