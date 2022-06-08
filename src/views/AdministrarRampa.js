import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { traerRampas } from '../api/http';
import cardStyles from './../styles/cardStyles';
import { useTheme } from 'react-native-paper';
import { themeHelper } from '../styles/styles';

const AdministrarRampa = () => {
  const [rampas, setRampas] = React.useState([]);
  const theme = useTheme();
  useEffect(() => {
    traerRampas().then(response => {setRampas(response)});
  },[]);

  return (
    <>
      <Text style={[{color:theme.colors.text},cardStyles.titulo]}>Rampas</Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {rampas.map((rampa, index) => CardRampa(theme,rampa, index))}
      </ScrollView>
      <TouchableOpacity
        style={[{backgroundColor:theme.colors.secondary},cardStyles.agregarButton]}
        onPress={() => console.log('Pressed')}>
        <Text style={{textAlign: 'center',color:theme.colors.secondaryText,padding:5}}>AGREGAR</Text>
      </TouchableOpacity>
    </>
  );
};
export default AdministrarRampa;

const CardRampa = (theme,rampa, index) => {
  const touchHandler = () => {
    console.log(rampa.id, rampa.direccion);
  };

  const rampaTxt = style => {
    return (
      <View style={style}>
        <Text style={[{color:theme.colors.text},cardStyles.text]}>{rampa.calle} {rampa.altura}</Text>
        <Text style={[{color:theme.colors.text},cardStyles.textCursiva]}>{rampa.estadoRampa}</Text>
        {/* <Text style={cardStyles.textCursiva}>{rampa.patente}</Text> */}
      </View>
    );
  };

  const rampaHandler = () => {
    if (index % 2 == 0) {
      return (
        <>
          <Image
            source={require('../utils/casaBrunillo.png')}
            style={cardStyles.imgRampa}
          />
          {rampaTxt(cardStyles.cardTextLeft)}
        </>
      );
    }
    return (
      <>
        {rampaTxt(cardStyles.cardTextRight)}
        <Image
          source={require('../utils/casaBrunillo.png')}
          style={cardStyles.imgRampa}
        />
      </>
    );
  };

  return (
    <Pressable style={[{backgroundColor:theme.colors.headerPerfil},cardStyles.card,cardStyles.elevation]} onPress={touchHandler}>
      {rampaHandler()}
    </Pressable>
  );
};

// const rampas = [
//   {
//     id: 0,
//     direccion: '012345678901234567890123456789012345678',
//     estado: 'Disponible',
//   },
//   {
//     id: 1,
//     direccion: '012345678901234567890123456789012345678',
//     estado: 'Alquilada',
//     patente: 'AB123CD',
//   },
//   {
//     id: 2,
//     direccion: 'San Jorge 4234',
//     estado: 'No disponible',
//   },
//   {
//     id: 3,
//     direccion: 'San Jorge 4334',
//     estado: 'Alquilada',
//     patente: 'AB123CD',
//   },
//   {
//     id: 4,
//     direccion: 'San Jorge 4234',
//     estado: 'Disponible',
//   },
//   {
//     id: 5,
//     direccion: 'San Jorge 4334',
//     estado: 'Alquilada',
//     patente: 'AB123CD',
//   },
// ];
