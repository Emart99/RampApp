import React from 'react';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import cardStyles from '../styles/cardStyles';
import reservaStyles from './../styles/reservaStyles';
import {useTheme} from 'react-native-paper';
import CardCarrito from '../components/CardCarrito';

const Carrito = () => {
  const theme = useTheme();
  return (
    <>
      <Text style={[{color: theme.colors.text}, reservaStyles.titulo]}>
        Carrito
      </Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {reservas.map(reserva => CardCarrito(reserva, theme))}
      </ScrollView>
      <TouchableOpacity
        style={[
          {backgroundColor: theme.colors.secondary},
          cardStyles.agregarButton,
        ]}
        onPress={() => console.log('Pressed')}>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.secondaryText,
            padding: 5,
          }}>
          ABONAR
        </Text>
      </TouchableOpacity>
    </>
  );
};
export default Carrito;

const reservas = [
  {
    id: 0,
    calle: 'Av Jorge Egger',
    altura: '1234555555555512',
    desde: '11:00',
    hasta: '12:00',
    precio: 200,
  },
  {
    id: 1,
    calle: 'Av Jorge Egger ',
    altura: '4444',
    desde: '12:00',
    hasta: '14:00',
    precio: 500,
  },
  {
    id: 2,
    calle: 'Av Jorge Egger',
    altura: '777',
    desde: '11:00',
    hasta: '12:00',
    precio: 200,
  },
  {
    id: 3,
    calle: 'Av Pisos Egger',
    altura: '000',
    desde: '11:00',
    hasta: '22:00',
    precio: 2000,
  },
  {
    id: 4,
    calle: 'Av Jorge Egger',
    altura: '222',
    desde: '10:00',
    hasta: '19:00',
    precio: 20,
  },
];
