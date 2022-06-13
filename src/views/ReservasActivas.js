import React from 'react';
import {Text, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';

import cardStyles from './../styles/cardStyles';
import reservaStyles from '../styles/reservaStyles';
import CardReserva from '../components/cards/CardReserva';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AdministrarReservas = ({navigation}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <>
      <Text style={[{color: theme.colors.text,paddingTop:insets.top}, reservaStyles.titulo]}>
        Reservas Activas
      </Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {reservas.map(reserva => CardReserva(reserva, theme))}
      </ScrollView>
    </>
  );
};
export default AdministrarReservas;

const reservas = [
  {
    id: 0,
    calle: 'Av Jorge Egger',
    altura: '123455555555552222222222',
    desde: '11:00',
    hasta: '12:00',
  },
  {
    id: 1,
    calle: 'Av Jorge Egger',
    altura: '4444',
    desde: '12:00',
    hasta: '14:00',
  },
  {
    id: 2,
    calle: 'Av Jorge Egger',
    altura: ' 777',
    desde: '11:00',
    hasta: '12:00',
  },
  {
    id: 3,
    calle: 'Av Pisos Egger',
    altura: ' 0',
    desde: '11:00',
    hasta: '22:00',
  },
  {
    id: 4,
    calle: 'Av Jorge Egger',
    altura: ' 2',
    desde: '10:00',
    hasta: '19:00',
  },
];
