import React from 'react';
import {IconButton} from 'react-native-paper';
import {
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import {rampaStyle} from './AdministrarRampa';
import {reservaStyle} from './ReservasActivas';
import {themeHelper} from '../styles/styles';

export const carritoStyle = StyleSheet.create({
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
    color: themeHelper().text,
    fontStyle: 'italic',
  },
  card: {
    // para el bgcolor
    padding: 10,
    width: '90%',
    maxHeight: 150,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#292929',
    marginBottom: 20,
    // para el bgcolor
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Carrito = () => {
  return (
    <>
      <Text style={reservaStyle.titulo}>Carrito</Text>
      <ScrollView style={rampaStyle.scrolleableContainer}>
        {reservas.map((reserva, index) => CardCarrito(reserva, index))}
      </ScrollView>
    </>
  );
};

export default Carrito;

const CardCarrito = (reserva, index) => {
  const touchHandler = () => {
    console.log(reserva.id, reserva.direccion);
  };

  const textHandler = (styleText, styleDenuncia) => {
    return (
      <View style={styleText}>
        <Text style={rampaStyle.text}>{reserva.direccion}</Text>
        <Text style={carritoStyle.textCursiva}>Desde: {reserva.desde}  Hasta: {reserva.hasta}</Text>
        <Text style={carritoStyle.textCursiva}>Precio ${reserva.precio}</Text>
        <IconButton
          style={styleDenuncia}
          icon="trash-can-outline"
          color="red"
          // size={20}
          // onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  };

  const rampaHandler = () => {
    if (index % 2 == 0) {
      return (
        <>
          <Image
            source={require('../utils/casaBrunillo.png')}
            style={carritoStyle.imgRampa}
          />
          {textHandler(
            carritoStyle.cardTextLeft,
            reservaStyle.denunciasIconRight,
          )}
        </>
      );
    }
    return (
      <>
        {textHandler(
          carritoStyle.cardTextRight,
          reservaStyle.denunciasIconLeft,
        )}
        <Image
          source={require('../utils/casaBrunillo.png')}
          style={carritoStyle.imgRampa}
        />
      </>
    );
  };

  return (
    <Pressable style={carritoStyle.card} onPress={touchHandler}>
      {rampaHandler()}
    </Pressable>
  );
};

const reservas = [
  {
    id: 0,
    direccion: 'Av Jorge Egger 123455555555552222222222',
    desde: '11:00',
    hasta: '12:00',
    precio: 200,
  },
  {
    id: 1,
    direccion: 'Av Jorge Egger 4444',
    desde: '12:00',
    hasta: '14:00',
    precio: 500,
  },
  {
    id: 2,
    direccion: 'Av Jorge Egger 777',
    desde: '11:00',
    hasta: '12:00',
    precio: 200,
  },
  {
    id: 3,
    direccion: 'Av Pisos Egger 0',
    desde: '11:00',
    hasta: '22:00',
    precio: 2000,
  },
  {
    id: 4,
    direccion: 'Av Jorge Egger 2',
    desde: '10:00',
    hasta: '19:00',
    precio: 20,
  },
];
