import React, {useEffect} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {traerRampas} from '../api/http';
import cardStyles from './../styles/cardStyles';
import {Modal, Portal, Provider, useTheme} from 'react-native-paper';
import CardRampa from '../components/CardRampa';
import CrearRampa from '../components/modales/crearRampa';
import GlobalButton from '../components/GlobalButton';

const AdministrarRampa = () => {
  // const [rampas, setRampas] = React.useState([]);
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);

  // useEffect(() => {
  //   traerRampas().then(response => {
  //     setRampas(response);
  //   });
  // }, []);

  return (
    <>
      <Text style={[{color: theme.colors.text}, cardStyles.titulo]}>
        Rampas
      </Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {rampas.map(rampa => CardRampa(rampa, theme))}
      </ScrollView>
      <TouchableOpacity
        style={[
          {backgroundColor: theme.colors.secondary},
          cardStyles.agregarButton,
        ]}
        onPress={showModal}>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.secondaryText,
            padding: 5,
          }}>
          AGREGAR
        </Text>
      </TouchableOpacity>
      {/* <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} dismissable={false}
        contentContainerStyle={{backgroundColor:theme.colors.modal}}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
          {CrearRampa(theme)}
          {GlobalButton("",{color: theme.colors.text},"Cancelar",hideModal)}
          {GlobalButton("",{color: theme.colors.text},"Agregar",hideModal)}
        </Modal>
      </Portal>
    </Provider> */}
    </>
  );
};
export default AdministrarRampa;

const rampas = [
    {
      id: 0,
      calle: 'Av zzz',
      altura: '012345678901234567890123456789012345678',
      estado: 'Disponible',
    },
    {
      id: 0,
      calle: 'Av zzz',
      altura: '0345678',
      estado: 'No disponible',
    },
    {
      id: 1,
      calle: 'Av zzz',
      altura: '0123',
      estado: 'Disponible',
    },
    {
      id: 2,
      calle: 'Av zzz',
      altura: '01234567890128',
      estado: 'Disponible',
    },
    {
      id: 3,
      calle: 'Av zzz',
      altura: '012',
      estado: 'No disponible',
    },
]