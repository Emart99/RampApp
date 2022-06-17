import {StyleSheet} from 'react-native'

const cardStyles = StyleSheet.create({
    titulo: {
      paddingLeft: 20,
      paddingBottom: 10,
      fontSize: 45,
    },
    scrolleableContainer: {
      paddingTop: 10,
      flex: 1,
      paddingBottom: 100
    },
    imgRampa: {
      width: 135,
      maxHeight: '80%',
      borderRadius: 8,
    },
    card: {
      // para el bgcolor
      padding: 10,
      width: '90%',
      height: 135,
      borderRadius: 8,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      // para el bgcolor
      // marginBottom: 40, //sin lo de arriba poner esto
      flex: 1,
      flexDirection: 'row',
      alignItems:'center'
    },
    cardTextLeft: {
      alignItems: 'flex-end',
      marginLeft: 25,
      width:'45%',
    },
    cardTextRight: {
      alignItems: 'flex-start',
      marginRight: 25,
      width:'45%',
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    textCursiva: {
      fontSize: 16,
      marginBottom: 3,
      fontStyle: 'italic',
    },
    agregarButton: {
      borderRadius: 2,
      position: 'absolute',
      width: 90,
      padding: 5,
      margin: 15,
      right: 0,
      bottom: 0,
      color: 'black',
    },
    elevation: {
        elevation: 10,
        shadowColor: 'black',
    }
  });

  export default cardStyles 