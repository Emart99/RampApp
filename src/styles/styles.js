import {StyleSheet, Appearance } from 'react-native'
import { DefaultTheme,DarkTheme} from 'react-native-paper';
import { darkMapStyles,lightMapStyles } from './mapSyles';

let colorScheme = 'light';

export function themeHelper(){

  if(colorScheme === 'light'){
    return LightTheme.colors
  }
  else{
    return DarkTheme.colors
  }
}

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    modal:'#c2c2c2',
    headerPerfil:"#d9d9d9",
    input:"#B2B2B2",
    background:'#F0F2F5',
    secondary:'#202124',
    text:'black',
    secondaryText:'white',
    borderTextInput:'#CCD0D5',
    mapTheme:"light"
  },
  mapStyles:lightMapStyles
};

export const _DarkTheme = {
  ...DarkTheme,
  colors: {
    modal:'#404040',
    headerPerfil:"#575757",
    input:"#5C5C5C",
    background:'#333',
    secondary:"#FFEC70",
    text:'white',
    secondaryText:'black',
    borderTextInput:'#777',
    mapTheme:"light",
},
mapStyles:darkMapStyles
};


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
      marginBottom:40
    },
    inputView:{
      width:"85%",
      height:45,
      marginBottom:27,
      justifyContent:"center",
    },
    crearText:{
      fontSize:26,
      marginBottom:20,
    },
    backIcon:{
      marginLeft: '4.5%',
      alignSelf:'flex-start',
      marginBottom: -20,
    },
    dateText:{
      textAlignVertical:'center',
      height:50,
      fontSize:16
    },
    loginButton:{
      width:"85%",
      borderRadius:8,
      height:45,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:10
    },
    loginText:{
    },
    loginSecondaryText:{
    },
    olvidoSuContrasenia:{
      fontSize:13
    },
    olvidoSuContraseniaModalInput:{
      height:50,
      fontSize:16
    },
    olvidoSuContraseniaModalView:{
      width:"85%",
      borderRadius:8,
      height:45,
      alignSelf:'center',
      justifyContent:"center",
      padding:20
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    mainScreenFooter:{
    },
    
    containerHeaderPerfil:{
      alignItems: 'center',
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
    },
    perfilContentText:{
      fontSize:20,
      marginBottom:20,
    },
    perfilMiniContentText:{
      fontSize:16,
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
      width:"85%",
      borderRadius:8,
      height:45,
      alignSelf:'center',
      alignItems:"center",
      justifyContent:"center",
    }
  });
  

export default styles;