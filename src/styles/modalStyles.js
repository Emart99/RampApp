import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
    imgContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems:'center',
      // width:'90%', alignSelf:'center'
    },
    ctn:{
      flexDirection:'row',
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
      marginTop:10,
    },
    textStyle:{
      marginLeft: 10, 
      fontSize: 17
    },
    button: {
      borderRadius: 8,
      width:75,
      padding: 5
    },
  });
export default modalStyles;