import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity} from 'react-native';
import {useTheme,Text} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import cardStyles from '../styles/cardStyles';
import reservaStyles from './../styles/reservaStyles';
import CardCarrito from '../components/cards/CardCarrito';
import PagoReserva from '../components/modales/PagoReserva';
import { traeCarrito } from '../api/http';

const Carrito = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [carrito,setCarrito] = useState([]);

  useFocusEffect(useCallback(()=>{
    const fetchCarrito = async () =>{
      const reser = await traeCarrito()
      setCarrito(reser)
    }
    fetchCarrito()
  },[visible]))

  const showModal = () => setVisible(true);
  
  return (
    <>
      <Text style={[{color: theme.colors.text,paddingTop:insets.top}, reservaStyles.titulo]}>
        Carrito
      </Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {carrito.map(reserva => CardCarrito(reserva, theme))}
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
          ABONAR
        </Text>
      </TouchableOpacity>
      {PagoReserva(visible,setVisible)}
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
