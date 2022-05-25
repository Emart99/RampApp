import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {themeHelper} from '../styles/styles';

export const rampaStyle = StyleSheet.create({
  titulo: {
    paddingLeft: 45,
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 45,
    color: themeHelper().secondary,
    backgroundColor: themeHelper().background,
  },
  scrolleableContainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: themeHelper().background,
  },
  imgRampa: {
    width: 135,
    maxHeight: '80%',
    borderRadius: 8,
  },
  card: {
    // para el bgcolor
    padding: 10,
    width: '90%',
    height: 135,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#292929',
    marginBottom: 20,
    // para el bgcolor
    // marginBottom: 40, //sin lo de arriba poner esto
    flex: 1,
    flexDirection: 'row',
    alignItems:'center'
  },
  cardTextLeft: {
    alignItems: 'flex-end',
    marginLeft: 25,
    width:'45%',
  },
  cardTextRight: {
    alignItems: 'flex-start',
    marginRight: 25,
    width:'45%',
  },
  text: {
    fontSize: 18,
    color: themeHelper().text,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textCursiva: {
    fontSize: 16,
    color: themeHelper().text,
    marginBottom: 3,
    fontStyle: 'italic',
  },
  agregarButton: {
    borderRadius: 8,
    position: 'absolute',
    width: 90,
    padding: 5,
    margin: 15,
    right: 0,
    bottom: 0,
    color: 'black',
    backgroundColor: themeHelper().secondary,
  },
});

const AdministrarRampa = () => {
  return (
    <>
      <Text style={rampaStyle.titulo}>Rampas</Text>
      <ScrollView style={rampaStyle.scrolleableContainer}>
        {rampas.map((rampa, index) => CardRampa(rampa, index))}
      </ScrollView>
      <TouchableOpacity
        style={rampaStyle.agregarButton}
        onPress={() => console.log('Pressed')}>
        <Text style={{textAlign: 'center'}}>AGREGAR</Text>
      </TouchableOpacity>
    </>
  );
};
export default AdministrarRampa;

const CardRampa = (rampa, index) => {
  const touchHandler = () => {
    console.log(rampa.id, rampa.direccion);
  };

  const rampaTxt = style => {
    return (
      <View style={style}>
        <Text style={rampaStyle.text}>{rampa.direccion}</Text>
        <Text style={rampaStyle.textCursiva}>{rampa.estado}</Text>
        <Text style={rampaStyle.textCursiva}>{rampa.patente}</Text>
      </View>
    );
  };

  const rampaHandler = () => {
    if (index % 2 == 0) {
      return (
        <>
          <Image
            source={require('../utils/casaBrunillo.png')}
            style={rampaStyle.imgRampa}
          />
          {rampaTxt(rampaStyle.cardTextLeft)}
        </>
      );
    }
    return (
      <>
        {rampaTxt(rampaStyle.cardTextRight)}
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

const rampas = [
  {
    id: 0,
    direccion: '012345678901234567890123456789012345678',
    estado: 'Disponible',
  },
  {
    id: 1,
    direccion: '012345678901234567890123456789012345678',
    estado: 'Alquilada',
    patente: 'AB123CD',
  },
  {
    id: 2,
    direccion: 'San Jorge 4234',
    estado: 'No disponible',
  },
  {
    id: 3,
    direccion: 'San Jorge 4334',
    estado: 'Alquilada',
    patente: 'AB123CD',
  },
  {
    id: 4,
    direccion: 'San Jorge 4234',
    estado: 'Disponible',
  },
  {
    id: 5,
    direccion: 'San Jorge 4334',
    estado: 'Alquilada',
    patente: 'AB123CD',
  },
];
