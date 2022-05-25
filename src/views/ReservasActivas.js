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
import { themeHelper } from '../styles/styles';
import {rampaStyle} from './AdministrarRampa';

export const reservaStyle = StyleSheet.create({
  titulo: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 18,
    fontSize: 45,
    color: themeHelper().secondary,
    backgroundColor: themeHelper().background,
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

const AdministrarReservas = () => {
    return (
        <>
          <Text style={reservaStyle.titulo}>Reservas Activas</Text>
          <ScrollView style={rampaStyle.scrolleableContainer}>
              {reservas.map((reserva, index) => CardReserva(reserva, index))}
          </ScrollView>
        </>
    )
}

export default AdministrarReservas;


const CardReserva = (reserva, index) => {
  const touchHandler = () => {
    console.log(reserva.id, reserva.direccion);
  };

  const textHandler = (styleText, styleDenuncia) => {
    return (
    <View style={styleText}>
      <Text style={rampaStyle.text}>{reserva.direccion}</Text>
      <View style={rampaStyle.timeCard}>
          <Text style={rampaStyle.textCursiva}>Desde: {reserva.desde}</Text>
          <Text style={rampaStyle.textCursiva}>Hasta: {reserva.hasta}</Text>
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
            style={rampaStyle.imgRampa}
          />
          {textHandler(reservaStyle.cardTextLeft, reservaStyle.denunciasIconRight)}
        </>
      );
    }
    return (
      <>
        {textHandler(reservaStyle.cardTextRight, reservaStyle.denunciasIconLeft)}
        <Image
          source={require('../utils/casaBrunillo.png')}
          style={rampaStyle.imgRampa}
        />
      </>
    );
  };

  return (
    <Pressable style={rampaStyle.card} onPress={touchHandler}>
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
