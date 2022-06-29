import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
  imgContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  ctn: {
    flexDirection: "row",
  },
  modal: {
    alignSelf: "center",
    paddingBottom: 25,
    paddingTop: 17,
    width: "95%",
    borderRadius: 4,
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 30,
    marginTop: 0,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 20,
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 17,
  },
  button: {
    borderRadius: 2,
    width: 100,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
  },
  button2: {
    borderRadius: 2,
    width: 150,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
  },
  fechaContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 85,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tituloBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  gralContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical:'3%'
  },
  switch: {
    marginLeft: 10,
    marginTop: -10,
  },
  textHorarios: {
    fontSize: 18,
    alignSelf: "center",
  },
  horariosContainer: {
    alignItems: "center",
  },
});
export default modalStyles;
