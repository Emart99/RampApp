import {StyleSheet} from 'react-native'

const amarillo="#FFEC70"
const backgroundOscuro='#333'
const inputOscuro="#5C5C5C"
const blanco='white'

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
        flex: 1
    },
    containerLogin: {
      flex: 1,
      backgroundColor: backgroundOscuro,
      alignItems: 'center',
      justifyContent: 'center',
    },

    containerMap: {
      height: "100%",
      width: "100%",
    },
    loguito:{
      fontWeight:"bold",
      fontSize:50,
      color:amarillo,
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:inputOscuro,
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:blanco
    },
    loginButton:{
      width:"80%",
      backgroundColor:amarillo,
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:blanco
    },
    olvidoSuContrasenia:{
      color:blanco,
      fontSize:11
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:amarillo
    },

  });

export default styles;