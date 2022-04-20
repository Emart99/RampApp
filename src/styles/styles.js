import {StyleSheet, Appearance } from 'react-native'

let colorScheme = 'dark';

function themeHelper(){
  if(colorScheme === 'light'){
    return light
  }
  else{
    return dark
  }
}


const dark = {
  input:"#5C5C5C",
  background:'#333',
  secondary:"#FFEC70",
  text:'white'
}
const light = {
  input:"#FFF4C2",
  background:'#FFFDDD',
  secondary:'#CC9966',
  text:'black'
}


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
      backgroundColor: themeHelper().background,
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
      color:themeHelper().secondary,
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:themeHelper().input,
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:themeHelper().text,
    },
    loginButton:{
      width:"80%",
      backgroundColor:themeHelper().secondary,
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:themeHelper().text,
    },
    olvidoSuContrasenia:{
      color:themeHelper().text,
      fontSize:11
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:themeHelper().secondary,
    },
    mainScreenFooter:{
      backgroundColor:themeHelper().secondary,
    },
    
    containerHeaderPerfil:{
      alignItems: 'center',
      backgroundColor: "grey",
    },
    perfilHeaderText:{
      fontSize:30,
      color:"black",
    },
    perfilText:{
      fontSize:20,
      color:"black",
      marginBottom:10,
    },
    containerPerfil:{
      flex:1,
      backgroundColor:themeHelper().background,
    },
    perfilContentText:{
      fontSize:20,
      color:themeHelper().text,
      marginBottom:20,
    },
    perfilMiniContentText:{
      fontSize:16,
      color:themeHelper().text,
      marginBottom:20,
      marginLeft:15,
    }
    ,
    alinearSwitch:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    perfilButton:{
      width:"50%",
      backgroundColor:themeHelper().secondary,
      borderRadius:25,
      height:50,
      alignSelf:'center',
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
    }
  });

export default styles;