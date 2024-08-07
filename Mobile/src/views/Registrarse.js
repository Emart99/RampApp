import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Formik } from "formik";

import styles from "../styles/styles";
import { registrar } from "../api/http";
import GlobalButton from "./../components/GlobalButton";
import GlobalInput from "../components/GlobalInput";
import { registerValidationSchema } from "../utils/registerSchema";
import { CommonActions } from "@react-navigation/native";

const Registrarse = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const theme = useTheme();
  const [showAlertDatosCorrectos, setShowAlertDatosCorrectos] = useState(false);
  const [showAlertDatosInvalidos, setShowAlertDatosInvalidos] = useState(false);

  const registerHandler = (values) => {
    const registro = {
      nombre: values.nombre,
      apellido: values.apellido,
      dni: values.dni,
      fechaDeNacimiento: fechaNacimiento,
      userName: values.userName,
      contrasenia: values.contrasenia,
      email: values.email,
    };
    registrar(registro)
      .then((resp) => setShowAlertDatosCorrectos(true))
      .catch((error) => setShowAlertDatosInvalidos(true));
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setFechaNacimiento(date);
  };

  return (
    <KeyboardAwareScrollView style={{ marginTop: insets.top }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerLogin}>
          <IconButton
            style={[styles.backIcon, { transform: [{ rotateY: "180deg" }] }]}
            color={theme.colors.text}
            icon="login"
            inline={true}
            size={35}
            onPress={() => {navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Login' },
                ],
              })
            );
            }}
          />
          {/* ALERT DE REGISTRADO CORRECTO */}
          <AwesomeAlert
            titleStyle={{ width: "100%", color: theme.colors.text }}
            contentContainerStyle={{ backgroundColor: theme.colors.background }}
            show={showAlertDatosCorrectos}
            showProgress={false}
            title="Registrado correctamente!"
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Volver al login"
            confirmButtonColor="#00DB6F"
            closeOnTouchOutside={false}
            onConfirmPressed={() => {
              setShowAlertDatosCorrectos(false);
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'Login' },
                  ],
                })
              );
              
            }}
          />
          {/* ALERT DE REGISTRADO INCORRECTO */}
          <AwesomeAlert
            titleStyle={{ width: "100%", color: theme.colors.text }}
            contentContainerStyle={{ backgroundColor: theme.colors.background }}
            show={showAlertDatosInvalidos}
            showProgress={false}
            title="Error, datos invalidos!"
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Volver a registrarse"
            confirmButtonColor="#DD6B55"
            closeOnTouchOutside={false}
            onConfirmPressed={() => {
              setShowAlertDatosInvalidos(false);
            }}
          />
          <Text style={[{ color: theme.colors.text }, styles.crearText]}>
            {" "}
            Crear cuenta{" "}
          </Text>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{
              nombre: "",
              apellido: "",
              dni: "",
              userName: "",
              contrasenia: "",
              confirmarContrasenia: "",
              email: "",
            }}
            onSubmit={(values) => registerHandler(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                {GlobalInput(
                  "Usuario",
                  values.userName,
                  handleChange("userName"),
                  handleBlur("userName"),
                  styles.inputView,
                  theme.colors.background,
                  false,
                  "default"
                )}
                {errors.userName && touched.userName && (
                  <Text style={styles.inputInvalidText}>{errors.userName}</Text>
                )}
                {GlobalInput(
                  "Contraseña",
                  values.contrasenia,
                  handleChange("contrasenia"),
                  handleBlur("contrasenia"),
                  styles.inputView,
                  theme.colors.background,
                  true,
                  "default"
                )}
                {errors.contrasenia && touched.contrasenia && (
                  <Text style={styles.inputInvalidText}>
                    {errors.contrasenia}
                  </Text>
                )}
                {GlobalInput(
                  "Confirmar contraseña",
                  values.confirmarContrasenia,
                  handleChange("confirmarContrasenia"),
                  handleBlur("confirmarContrasenia"),
                  styles.inputView,
                  theme.colors.background,
                  true,
                  "default"
                )}
                {errors.confirmarContrasenia &&
                  touched.confirmarContrasenia && (
                    <Text style={styles.inputInvalidText}>
                      {errors.confirmarContrasenia}
                    </Text>
                  )}
                {GlobalInput(
                  "Email",
                  values.email,
                  handleChange("email"),
                  handleBlur("email"),
                  styles.inputView,
                  theme.colors.background,
                  false,
                  "email-address"
                )}
                {errors.email && touched.email && (
                  <Text style={styles.inputInvalidText}>{errors.email}</Text>
                )}
                {GlobalInput(
                  "Nombre",
                  values.nombre,
                  handleChange("nombre"),
                  handleBlur("nombre"),
                  styles.inputView,
                  theme.colors.background,
                  false,
                  "default"
                )}
                {errors.nombre && touched.nombre && (
                  <Text style={styles.inputInvalidText}>{errors.nombre}</Text>
                )}
                {GlobalInput(
                  "Apellido",
                  values.apellido,
                  handleChange("apellido"),
                  handleBlur("apellido"),
                  styles.inputView,
                  theme.colors.background,
                  false,
                  "default"
                )}
                {errors.apellido && touched.apellido && (
                  <Text style={styles.inputInvalidText}>{errors.apellido}</Text>
                )}
                {/* Date Picker */}
                <TouchableOpacity
                  style={styles.inputView}
                  onPress={(e) => {
                    setShowDatePicker(true);
                  }}
                >
                  <TextInput
                    mode="flat"
                    editable={false}
                    outlineColor="transparent"
                    style={{ backgroundColor: theme.colors.background }}
                    underlineColor={theme.colors.globalInput}
                    activeUnderlineColor={theme.colors.globalInput}
                    theme={{ colors: { text: theme.colors.globalInput } }}
                  >
                    {"Fecha de nacimiento: " +
                      `${fechaNacimiento.getDate()}/${
                        fechaNacimiento.getMonth() + 1
                      }/${fechaNacimiento.getFullYear()}`}
                  </TextInput>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={showDatePicker}
                  mode="date"
                  onConfirm={(date) => onConfirm(date)}
                  onCancel={() => setShowDatePicker(false)}
                  date={new Date()}
                />
                {/* Date Picker */}
                {/* falta validacion fecha nacimiento */}
                {GlobalInput(
                  "DNI",
                  values.dni,
                  handleChange("dni"),
                  handleBlur("dni"),
                  styles.inputView,
                  theme.colors.background,
                  false,
                  "number-pad"
                )}
                {errors.dni && touched.dni && (
                  <Text style={styles.inputInvalidText}>{errors.dni}</Text>
                )}
                {GlobalButton(
                  [
                    styles.loginButton,
                    { backgroundColor: theme.colors.secondary },
                  ],
                  {
                    color: theme.colors.secondaryText,
                    fontSize: 16,
                    fontFamily: "Poppins_500Medium",
                  },
                  "REGISTRAR",
                  handleSubmit,
                  isValid
                )}
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Registrarse;
