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

import styles from "../styles/styles";
import { registrar } from "../api/http";
import GlobalButton from "./../components/GlobalButton";
import GlobalInput from "../components/GlobalInput";

const Registrarse = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [dni, setDni] = useState("");
  const theme = useTheme();
  const [showAlertDatosCorrectos, setShowAlertDatosCorrectos] = useState(false);
  const [showAlertDatosInvalidos, setShowAlertDatosInvalidos] = useState(false);

  const handleSubmit = () => {
    const registro = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      fechaDeNacimiento: fechaNacimiento,
      userName: usuario,
      contrasenia: contraseña,
      email: email,
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
            onPress={() => navigation.navigate("Login")}
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
              navigation.navigate("Login");
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
          {GlobalInput(
            "Usuario",
            usuario,
            setUsuario,
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Contraseña",
            contraseña,
            setContraseña,
            styles.inputView,
            true,
            "default"
          )}
          {GlobalInput(
            "Confirmar contraseña",
            confirmarContraseña,
            setConfirmarContraseña,
            styles.inputView,
            true,
            "default"
          )}
          {GlobalInput(
            "Email",
            email,
            setEmail,
            styles.inputView,
            false,
            "email-address"
          )}
          {GlobalInput(
            "Nombre",
            nombre,
            setNombre,
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Apellido",
            apellido,
            setApellido,
            styles.inputView,
            false,
            "default"
          )}

          {/* Date Picker */}
          <TouchableOpacity
            style={styles.inputView}
            onPress={(e) => {
              setShowDatePicker(true);
            }}
          >
            <TextInput
              mode="outlined"
              editable={false}
              outlineColor="transparent"
              theme={{
                colors: {
                  placeholder: theme.colors.text,
                  background: theme.colors.input,
                },
              }}
            >
              {"Fecha de nacimiento: " +
                `${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth()}/${fechaNacimiento.getFullYear()}`}
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

          {GlobalInput(
            "DNI",
            dni,
            setDni,
            styles.inputView,
            false,
            "number-pad"
          )}
          {GlobalButton(
            [styles.loginButton, { backgroundColor: theme.colors.secondary }],
            { color: theme.colors.secondaryText },
            "REGISTRAR",
            handleSubmit
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Registrarse;
