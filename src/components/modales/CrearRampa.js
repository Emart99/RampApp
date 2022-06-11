import React from 'react';
import {
  Text,
  IconButton,
  useTheme,
  Portal,
  Modal,
  
} from 'react-native-paper';
import GlobalInput from '../GlobalInput';
import GlobalButton from '../GlobalButton';
import { StyleSheet, View } from 'react-native';
import styles from '../../styles/styles';
import { geocoder } from '../../api/http';

const CrearRampa = (visible, setVisible) => {
  const theme = useTheme();

  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Modal contentContainerStyle={{backgroundColor:theme.colors.modal,alignSelf:'center',paddingBottom:25,paddingTop:10,width:'90%',borderRadius:4}} animationType="fade"
       visible={visible}>
        
        <View style={{display:'flex',alignItems:'center',marginBottom:20}}>
          <Text style={{fontSize:20,fontWeight:'bold',margin:30,marginTop:0}}>Agregar Rampa</Text>
          {GlobalInput(
            'Calle',
            '',
            'setCalle',
            styles.inputView,
            false,
            'default',
          )}
          {GlobalInput(
            'Altura',
            '',
            'setAltura',
            styles.inputView,
            false,
            'default',
          )}
          {GlobalInput(
            'Partido',
            '',
            'setPartido',
            styles.inputView,
            false,
            'default',
          )}
          {GlobalInput(
            'Localidad',
            '',
            'setLocalidad',
            styles.inputView,
            false,
            'default',
          )}
        </View >
        {/* imgs */}
        
        <View style={modalStyles.inputContainer}>
          <Text style={{fontSize:18}}>Foto Rampa: </Text>
          <IconButton
            icon="image-plus"
            color={theme.colors.text}
            onPress={() => console.log('zz')}
          />
          <IconButton
            icon="camera"
            color={theme.colors.text}
            onPress={() => console.log('zz')}
          />
        </View>
        <View style={modalStyles.inputContainer}>
          <Text style={{fontSize:18}}>Foto DNI: </Text>
          <IconButton
            icon="image-plus"
            color={theme.colors.text}
            onPress={() => console.log('zz')}
          />
          <IconButton
            icon="camera"
            color={theme.colors.text}
            onPress={() => console.log('zz')}
          />
        </View>
        <View style={modalStyles.inputContainer}>
          <Text style={{fontSize:18}}>Foto Escritura: </Text>
          <IconButton
            icon="image-plus"
            color={theme.colors.text}
            onPress={() => console.log('zz')}
          />
          <IconButton
            icon="camera"
            color={theme.colors.text}
            onPress={() => geocoder(jsonFalopa).then(data=>console.log(data))}
          />
        </View>
        <View style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',flexDirection:'row'}}>
        {GlobalButton('', { color: theme.colors.text }, 'Cancelar', hideModal)}
        {GlobalButton('', { color: theme.colors.text }, 'Agregar', hideModal)}
        </View>
      </Modal>
      </Portal>
  );
};

export default CrearRampa;
const jsonFalopa = {
    altura:3964,
    calle:'Jose Hernandez',
    localidad:'',
    ciudad:'Villa Ballester',
    partido:'San Martin',
    codigopostal:1653

}
const modalStyles = StyleSheet.create({
  inputContainer: {
    display:"flex",
    flexDirection:'row',
    justifyContent:"space-around"
  }
});
