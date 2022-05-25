import {StyleSheet, Appearance } from 'react-native'

let colorScheme = 'dark';

export function themeHelper(){
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
      fontSize:60,
      color:themeHelper().secondary,
      marginBottom:40
    },
    inputView:{
      width:"85%",
      backgroundColor:themeHelper().input,
      borderRadius:8,
      height:45,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    crearText:{
      color:themeHelper().text,
      fontSize:20,
      marginBottom:20,
    },
    backIcon:{
      marginLeft: 30,
      alignSelf:'flex-start',
      marginBottom: -20
    },
    inputText:{
      height:50,
      color:themeHelper().text,
      fontSize:16
    },
    dateText:{
      textAlignVertical:'center',
      height:50,
      color:themeHelper().text,
      fontSize:16
    },
    loginButton:{
      width:"85%",
      backgroundColor:themeHelper().secondary,
      borderRadius:8,
      height:45,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:10
    },
    loginText:{
      color:themeHelper().text,
    },
    olvidoSuContrasenia:{
      color:themeHelper().text,
      fontSize:13
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
      backgroundColor: "#575757",
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