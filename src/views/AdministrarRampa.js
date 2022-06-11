import React from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import cardStyles from './../styles/cardStyles';
import {
  useTheme,
  // IconButton,
  // Modal,
  // Portal,
} from 'react-native-paper';
import CardRampa from '../components/CardRampa'
// import GlobalButton from '../components/GlobalButton';
// import GlobalInput from '../components/GlobalInput';
// import styles from '../styles/styles';
import CrearRampa from '../components/modales/CrearRampa';
// import CrearRampa from '../components/modales/CrearRampa';

const AdministrarRampa = () => {
  // const [rampas, setRampas] = React.useState([]);
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

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
        onPress={()=>{showModal();console.log(visible)}}>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.secondaryText,
            padding: 5,
          }}>
          AGREGAR
        </Text>
      </TouchableOpacity>
      
     {CrearRampa(visible, setVisible)}
     
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
];