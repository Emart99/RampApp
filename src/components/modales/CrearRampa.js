import React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
  IconButton,
} from 'react-native-paper';
import GlobalInput from '../GlobalInput';
import styles from '../styles/styles';

const CrearRampa = theme => {
//   const [direccion, setDireccion] = React.useState('');

  return (
    <>
      {GlobalInput(
        'Direccion',
        "direccion",
        "setDireccion",
        styles.inputView,
        false,
        'default',
      )}
      {['Rampa', 'DNI', 'Escritura'].map(label=>
        {<>
            <Text>Foto {label}: </Text>
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
        </>}
      )}
      
      
    </>
  );
};

export default CrearRampa;
