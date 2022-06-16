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
    paddingTop: 10,
    width: "95%",
    borderRadius: 4,
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 30,
    marginTop: 0,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 10,
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 17,
  },
  button: {
    borderRadius: 8,
    width: 80,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
  },
  button2: {
    borderRadius: 8,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tituloBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  gralContainer: {
    flex: 3,
    justifyContent: "center",
    alignContent: "center",
  },
  switchContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginBottom:20
  },
  switch: {
    marginLeft: 10,
    marginBottom: -4
  },
  textHorarios: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 20,
  },
  horariosContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
export default modalStyles;
