import {StyleSheet} from 'react-native'
import { themeHelper } from './styles';

const carritoStyle = StyleSheet.create({
    imgRampa: {
      width: 100,
      maxHeight: 90,
      borderRadius: 8,
    },
    cardTextLeft: {
      alignItems: 'flex-end',
      marginLeft: 15,
      maxWidth: '60%',
    },
    cardTextRight: {
      alignItems: 'flex-start',
      marginRight: 15,
      maxWidth: '60%',
    },
    textCursiva: {
      fontSize: 16,
      fontStyle: 'italic',
    },
    card: {
      padding: 10,
      width: '90%',
      maxHeight: 150,
      borderRadius: 8,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default carritoStyle