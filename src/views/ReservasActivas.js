import React from 'react';
import { IconButton } from 'react-native-paper';
import {
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  StyleSheet
} from 'react-native';
import cardStyles from './../styles/cardStyles';
import reservaStyles from '../styles/reservaStyles';
import { useTheme } from 'react-native-paper';


const AdministrarReservas = ({navigation}) => {
  const theme = useTheme();
    return (
        <>
          <Text style={[{color:theme.colors.text},reservaStyles.titulo]}>Reservas Activas</Text>
          <ScrollView style={cardStyles.scrolleableContainer}>
              {reservas.map((reserva, index) => CardReserva(reserva, index))}
          </ScrollView>
        </>
    )
}

export default AdministrarReservas;


const CardReserva = (reserva, index) => {
  const theme = useTheme();
  const touchHandler = () => {
    console.log(reserva.id, reserva.direccion);
  };

  const textHandler = (styleText, styleDenuncia) => {
    return (
    <View style={styleText}>
      <Text style={[{color:theme.colors.text},cardStyles.text]}>{reserva.direccion}</Text>
      <View style={[{color:theme.colors.text},cardStyles.timeCard]}>
          <Text style={[{color:theme.colors.text},cardStyles.textCursiva]}>Desde: {reserva.desde}</Text>
          <Text style={[{color:theme.colors.text},cardStyles.textCursiva]}>Hasta: {reserva.hasta}</Text>
        <IconButton
            style={styleDenuncia}
            icon='alert'
            color='red'
            // size={20}
            // onPress={() => navigation.navigate('Login')}
          />
      </View>
    </View>)
  }

  const rampaHandler = () => {
    if (index % 2 == 0) {
      return (
        <>
          <Image
            source={require('../utils/casaBrunillo.png')}
            style={cardStyles.imgRampa}
          />
          {textHandler(reservaStyles.cardTextLeft, reservaStyles.denunciasIconRight)}
        </>
      );
    }
    return (
      <>
        {textHandler(reservaStyles.cardTextRight, reservaStyles.denunciasIconLeft)}
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

const reservas = [
  {id: 0, direccion: 'Av Jorge Egger 123455555555552222222222', desde: '11:00', hasta: '12:00'},
  {id: 1, direccion: 'Av Jorge Egger 4444', desde: '12:00', hasta: '14:00'},
  {id: 2, direccion: 'Av Jorge Egger 777', desde: '11:00', hasta: '12:00'},
  {id: 3, direccion: 'Av Pisos Egger 0', desde: '11:00', hasta: '22:00'},
  {id: 4, direccion: 'Av Jorge Egger 2', desde: '10:00', hasta: '19:00'},
];
