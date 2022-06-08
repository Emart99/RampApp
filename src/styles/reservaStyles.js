import {StyleSheet} from "react-native"
import { themeHelper } from "./styles"
const reservaStyles = StyleSheet.create({
    titulo: {
      paddingTop: 15,
      paddingBottom: 10,
      paddingLeft: 18,
      fontSize: 45,
    },
    cardTextLeft: {
      alignItems: 'flex-end',
      marginLeft: 0,
      width:'60%',
    },
    cardTextRight: {
      alignItems: 'flex-start',
      marginRight: 0,
      width:'60%',
    },
    timeCard:{
      flex:1,
      flexDirection:'row',
    },
    denunciasIconLeft:{
      alignSelf:'flex-start',
      width:30,
      height:30,
      marginLeft:0,
      marginBottom:0
    },
    denunciasIconRight:{
      alignSelf:'flex-end',
      width:30,
      height:30,
      marginRight:0,
      marginBottom:0
    }
  })

export default reservaStyles
  