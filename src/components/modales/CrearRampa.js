import React, { useState } from "react";
import { Text, IconButton, useTheme, Portal, Modal } from "react-native-paper";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Formik } from "formik";
import AwesomeAlert from "react-native-awesome-alerts";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import { geocoder, subirImagen } from "../../api/http";
import { rampaValidationSchema } from "../../utils/rampaSchema";

const CrearRampa = (visible,
                    setVisible,
                    theme,
                    showAlertDatosCorrectos,
                    setShowAlertDatosCorrectos,
                    showAlertDatosInvalidos,
                    setShowAlertDatosInvalidos) => {
  
  
  const pickImage = async (setFieldValue, setFieldTouched, imgValue) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });
    setImage(setFieldValue, setFieldTouched, imgValue, result);
  };

  const openCamera = async (setFieldValue, setFieldTouched, imgValue) => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se necesitan permisos para usar la cámara");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    setImage(setFieldValue, setFieldTouched, imgValue, result);
  };

  const setImage = (setFieldValue, setFieldTouched, imgValue, result) => {
    if (!result.cancelled) {
      setFieldValue(imgValue, result.base64);
      setFieldTouched(imgValue, true);
    }
  };

  const hideModal = () => {
    setVisible(false);
  };

  const hideModalCorrecta = () => {
    hideModal();
    setShowAlertDatosCorrectos(true);
  };

  const agregarRampa = async (values) => {
    const imagenRampa = await subirImagen(values.imgRampa).catch((err) => {
      console.log(err);
    });
    const imagenDNI = await subirImagen(values.imgDNI).catch((err) => {
      console.log(err);
    });
    const imagenEscritura = await subirImagen(values.imgEscritura).catch(
      (err) => {
        console.log(err);
      }
    );

    const geoJson = await geocoder({
      altura: values.altura,
      calle: values.calle,
      partido: values.partido,
      codigopostal: values.cp,
    }).catch((err) => {
      console.log(err);
    });
    console.log("Rampa: " + imagenRampa.data.link);
    console.log("DNI: " + imagenDNI.data.link);
    console.log("Escritura: " + imagenEscritura.data.link);
    console.log(geoJson[0].lat,geoJson[0].lon);
  };

  // Array [
  //   Object {
  //     "boundingbox": Array [
  //       "-34.617574",
  //       "-34.617474",
  //       "-58.557539",
  //       "-58.557439",
  //     ],
  //     "class": "place",
  //     "display_name": "4371, 640 - Guaminí, Barrio Evita, Villa Alianza, Caseros, Partido de Tres de Febrero, Buenos Aires, B1678BFF, Argentina",
  //     "importance": 1.021,
  //     "lat": "-34.617523999999996",
  //     "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
  //     "lon": "-58.557489000000004",
  //     "osm_id": 682177340,
  //     "osm_type": "way",
  //     "place_id": 92109122,
  //     "type": "house",
  //   },
  // ]

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
        title="Error, la rampa ya estaba registrada!"
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Volver a registrarse"
        confirmButtonColor="#DD6B55"
        closeOnTouchOutside={false}
        onConfirmPressed={() => {
          setShowAlertDatosInvalidos(false);
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
                partido: "",
                cp: "",
                nroPartida: "",
                imgRampa: "",
                imgEscritura: "",
                imgDNI: "",
              }}
              onSubmit={(values) => agregarRampa(values)}
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
                      false,
                      "default"
                    )}
                    {errors.altura && touched.altura && (
                      <Text style={styles.inputInvalidText}>
                        {errors.altura}
                      </Text>
                    )}
                    {GlobalInput(
                      "Partido",
                      values.partido,
                      handleChange("partido"),
                      handleBlur("partido"),
                      styles.inputView,
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
                      false,
                      "default"
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
                      false,
                      "default"
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
                  <View style={modalStyles.imgInputsContainer}>
                    <View style={[modalStyles.imgContainer]}>
                      <Text style={modalStyles.textStyle}>Foto Rampa</Text>
                      <Text style={modalStyles.textStyle}>Foto DNI</Text>
                      <Text style={modalStyles.textStyle}>Foto Escritura</Text>
                    </View>
                    <View style={modalStyles.imgContainer}>
                      <View style={modalStyles.ctn}>
                        <IconButton
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
                          icon="image-plus"
                          color={theme.colors.text}
                          onPress={() =>
                            pickImage(setFieldValue, setFieldTouched, "imgDNI")
                          }
                          style={{ margin: 0, padding: 0 }}
                          size={27}
                        />
                        <IconButton
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
                      {
                        color: theme.colors.secondaryText,
                        textAlign: "center",
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
const jsonFalopa = {
  altura: 3964,
  calle: "Jose Hernandez",
  localidad: "Las Heras",
  ciudad: "Villa Ballester",
  partido: "San Martin",
  codigopostal: 1653,
};
