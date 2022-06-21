import { StyleSheet, Appearance } from "react-native";
import { DefaultTheme, DarkTheme } from "react-native-paper";
import { darkMapStyles, lightMapStyles } from "./mapSyles";

let colorScheme = "light";

export function themeHelper() {
  if (colorScheme === "light") {
    return LightTheme.colors;
  } else {
    return DarkTheme.colors;
  }
}

export const LightTheme = {
  ...DefaultTheme,
  fontFamily: { ...(DarkTheme.fonts.regular.fontFamily = "Poppins_400Regular") ,
    ...(DarkTheme.fonts.medium.fontFamily = "Poppins_300Light"),
    ...(DarkTheme.fonts.light.fontFamily = "Poppins_200ExtraLight"),
    ...(DarkTheme.fonts.thin.fontFamily = "Poppins_100Thin")
   },
  colors: {
    modal: "#c2c2c2",
    headerPerfil: "#d9d9d9",
    input: "#d9d9d9",
    background: "#F0F2F5",
    secondary: "#202124",
    text: 'black',
    onSurface: "#F0F2F5",
    secondaryText: "white",
    borderTextInput: "#CCD0D5",
    mapTheme: "light",
  },
  mapIcon:require("../assets/icons/LIGHTMODEICON.png"),
  mapStyles: lightMapStyles,
};

export const _DarkTheme = {
  ...DarkTheme,
  fontFamily: { ...(DarkTheme.fonts.regular.fontFamily = "Poppins_400Regular") ,
    ...(DarkTheme.fonts.medium.fontFamily = "Poppins_300Light"),
    ...(DarkTheme.fonts.light.fontFamily = "Poppins_200ExtraLight"),
    ...(DarkTheme.fonts.thin.fontFamily = "Poppins_100Thin")
   },
  colors: {
    modal: "#1B1F23",
    headerPerfil: "#262A2D",
    input: "#2A2E34",
    background: "#1B1F23",
    onSurface: "#F0F2F5",
    secondary: "#4527A0",
    text: 'white',
    secondaryText: "white",
    borderTextInput: "#777",
    mapTheme: "light",
  },
  mapIcon:require("../assets/icons/DARKMODEICON.png"),
  mapStyles: darkMapStyles,
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  containerLogin: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerMap: {
    height: "100%",
    width: "100%",
  },
  loguito: {
    fontSize: 67,
    marginBottom: 30,
  },
  inputView: {
    width: "85%",
    height: 45,
    marginBottom: 27,
    justifyContent: "center",
  },
  crearText: {
    fontSize: 30,
    marginBottom: 20,
  },
  backIcon: {
    marginLeft: "4.5%",
    alignSelf: "flex-start",
    marginBottom: -20,
  },
  dateText: {
    textAlignVertical: "center",
    height: 50,
    fontSize: 16,
  },
  loginButton: {
    width: "85%",
    borderRadius: 2,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {},
  loginSecondaryText: {},
  olvidoSuContrasenia: {
    fontSize: 13,
  },
  olvidoSuContraseniaModalInput: {
    height: 50,
    fontSize: 16,
  },
  olvidoSuContraseniaModalView: {
    width: "100%",
    borderRadius: 8,
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  mainScreenFooter: {},

  containerHeaderPerfil: {
    alignItems: "center",
  },
  perfilHeaderText: {
    fontSize: 30,
  },
  perfilText: {
    fontSize: 20,
    marginBottom: 10,
  },
  containerPerfil: {
    flex: 1,
  },
  perfilContentText: {
    fontSize: 20,
    marginBottom: 20,
  },
  perfilMiniContentText: {
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 15,
  },
  alinearSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  perfilButton: {
    width: "85%",
    borderRadius: 2,
    height: 45,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInvalidText: {
    color: "red",
    alignSelf: "flex-start",
    marginTop: -15,
    marginBottom: 15,
    marginStart: "8%",
  },
  inputValidImg: {
    fontSize: 12,
    marginTop: -20,
    color: "red",
    width: "30%",
    textAlign: "center",
  },
  inputImgSubida: {
    fontSize: 12,
    marginTop: -20,
    color: "green",
    width: "30%",
    textAlign: "center",
  },
  toastDenuncia: {
    backgroundColor: "#3fab75",
    elevation: 0,
    width: "75%",
    borderRadius: 0,
    alignSelf: "center",
    margin: 0,
    padding: 0,
  },
  toastDenunciaWrapper: {
    backgroundColor: "#3fab75",
    width: "100%",
    alignItems: "center",
    height: "7%",
  },
});

export default styles;
