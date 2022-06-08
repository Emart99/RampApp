import {StyleSheet} from "react-native"
import { themeHelper } from "./styles";
const vehiculoStyles = StyleSheet.create({
    card: {
      padding: 10,
      width: '90%',
      height: 90,
      borderRadius: 8,
      alignSelf: 'center',
      justifyContent: 'space-around',
      marginBottom: 20,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    agregarButton: {
      borderRadius: 8,
      position: 'absolute',
      width: 90,
      height: '4.5%',
      padding: 6,
      margin: 15,
      right: 0,
      bottom: 0,
      color: 'black',
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
    }
    
  });

export default vehiculoStyles