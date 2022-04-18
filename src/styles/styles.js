import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    map: {
        flex: 1
    },
    containerLogin: {
      flex: 1,
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
    },

    containerMap: {
      height: "100%",
      width: "100%",
      backgroundColor: 'white'
    },
    loguito:{
      fontWeight:"bold",
      fontSize:50,
      color:"#FFEC70",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#5C5C5C",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    loginButton:{
      width:"80%",
      backgroundColor:"#FFEC70",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    },
    olvidoSuContrasenia:{
      color:"white",
      fontSize:11
    }
  });

export default styles;