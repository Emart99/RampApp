import React from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Formik } from "formik";

import styles from "../styles/styles";
import OlvidoSuContrasenia from "./../components/OlvidoSuContraseniaDialog";
import { logear } from "../api/http";
import GlobalButton from "./../components/GlobalButton";
import GlobalInput from "../components/GlobalInput";
import { setUsuarioId } from "./../api/http";
import { loginValidationSchema } from "../utils/loginSchema";

const Login = ({ navigation }) => {
  const [visibleOlvidoSuContrasenia, setVisibleOlvidoSuContrasenia] =
    React.useState(false);
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState("");

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const loginHandler = (values) => {
    logear(values)
      .then((response) => {
        navigation.navigate("MainScreen");
        setUsuarioId(response.id);
      })
      .catch((error) => {
        setMensajeError(error.response.data.message);
        onToggleSnackBar();
      });
  };

  const registerNavigation = () => {
    navigation.navigate("Registrarse");
  };

  const olvidoSuContraseniaHelper = () => {
    setVisibleOlvidoSuContrasenia(!visibleOlvidoSuContrasenia);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerLogin}>
        <Text style={[{ color: theme.colors.secondary }, styles.loguito]}>
          RampApp
        </Text>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={4500}
          style={{
            backgroundColor: "#F8615A",
            width: "100%",
            borderRadius:0,
            height: "100%",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: theme.colors.text,fontSize:17}}>{mensajeError}</Text>
        </Snackbar>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ userName: "", contrasenia: "" }}
          onSubmit={(values) => loginHandler(values)}
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
                true,
                "default"
              )}
              {errors.contrasenia && touched.contrasenia &&(
                <Text style={styles.inputInvalidText}>
                  {errors.contrasenia}
                </Text>
              )}
              <View style={{ marginTop: 10 }} />
              {GlobalButton(
                "",
                { color: theme.colors.text },
                "Olvido su contraseña?",
                olvidoSuContraseniaHelper
              )}
              {OlvidoSuContrasenia(
                visibleOlvidoSuContrasenia,
                setVisibleOlvidoSuContrasenia
              )}
              {GlobalButton(
                [
                  styles.loginButton,
                  { backgroundColor: theme.colors.secondary },
                ],
                { color: theme.colors.secondaryText },
                "INGRESAR",
                handleSubmit,
                isValid
              )}
              {GlobalButton(
                "",
                { color: theme.colors.text },
                "Registrarse",
                registerNavigation
              )}
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Login;
