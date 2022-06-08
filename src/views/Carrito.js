import React from 'react';
import {IconButton} from 'react-native-paper';
import {
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity
} from 'react-native';
import carritoStyles from '../styles/carritoStyles'
import cardStyles from '../styles/cardStyles';
import reservaStyles from './../styles/reservaStyles';
import { useTheme } from 'react-native-paper';


const Carrito = () => {
  const theme = useTheme();
  return (
    <>
      <Text style={[{color:theme.colors.text},reservaStyles.titulo]}>Carrito</Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {reservas.map((reserva, index) => CardCarrito(reserva, index))}
      </ScrollView>
      <TouchableOpacity
         style={[{backgroundColor:theme.colors.secondary},cardStyles.agregarButton]}
         onPress={() => console.log('Pressed')}>
         <Text style={{textAlign: 'center',color:theme.colors.secondaryText,padding:5}}>ABONAR</Text>
      </TouchableOpacity>
    </>
  );
};

export default Carrito;

const CardCarrito = (reserva, index) => {
  const theme = useTheme();
  const touchHandler = () => {
    console.log(reserva.id, reserva.direccion);
  };

  const textHandler = (styleText, styleDenuncia) => {
    return (
      <View style={styleText}>
        <Text style={[{color:theme.colors.text},cardStyles.text]}>{reserva.direccion}</Text>
        <Text style={[{color:theme.colors.text},carritoStyles.textCursiva]}>Desde: {reserva.desde}  Hasta: {reserva.hasta}</Text>
        <Text style={[{color:theme.colors.text},carritoStyles.textCursiva]}>Precio ${reserva.precio}</Text>
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
            style={carritoStyles.imgRampa}
          />
          {textHandler(
            carritoStyles.cardTextLeft,
            reservaStyles.denunciasIconRight,
          )}
        </>
      );
    }
    return (
      <>
        {textHandler(
          carritoStyles.cardTextRight,
          reservaStyles.denunciasIconLeft,
        )}
        <Image
          source={require('../utils/casaBrunillo.png')}
          style={carritoStyles.imgRampa}
        />
      </>
    );
  };

  return (
    <Pressable style={[{backgroundColor:theme.colors.headerPerfil},carritoStyles.card,cardStyles.elevation]} onPress={touchHandler}>
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
