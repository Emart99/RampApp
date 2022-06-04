import React, {useState,useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { themeHelper } from '../styles/styles';
import { ScrollView } from 'react-native';
import { IconButton } from "react-native-paper";
import { traerVehiculos } from '../api/http';

export const vehiculoStyle = StyleSheet.create({
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
    padding: 10,
    width: '90%',
    height: 90,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#292929',
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: themeHelper().text,
    fontWeight: 'bold',
  },
  agregarButton: {
    borderRadius: 8,
    position: 'absolute',
    width: 90,
    height: '4.5%',
    padding: 6,
    margin: 15,
    right: 0,
    bottom: 0,
    color: 'black',
    backgroundColor: themeHelper().secondary,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  elevation: {
    elevation: 10,
    shadowColor: 'black',
  },
});

const AdministrarVehiculo = () => {
  // const [vehiculos, setVehiculos] = useState([])

  // useEffect(() => {
  //   traerVehiculos().then(response => {setVehiculos(response)});
  // },[]);

  return (
    <>
      <Text style={vehiculoStyle.titulo}>Vehiculo</Text>
      <ScrollView style={vehiculoStyle.scrolleableContainer}>
        {vehiculos.map(vehiculo => VehiculoCard(vehiculo))}
      </ScrollView>
      <TouchableOpacity
        style={[vehiculoStyle.agregarButton,vehiculoStyle.elevation]}
        onPress={() => console.log('Pressed')}>
        <Text style={{ textAlign: 'center' }}>AGREGAR</Text>
      </TouchableOpacity>
    </>

  )
}
export default AdministrarVehiculo;

const VehiculoCard = (vehiculo) => {
  return (
      <View style={[vehiculoStyle.card,vehiculoStyle.elevation]}>
        <IconButton
          icon="car"
          size={50}
        // onPress={() => navigation.navigate('Login')}
        />

        <Text style={vehiculoStyle.text}>{vehiculo.patente}</Text>
        <View style={vehiculoStyle.buttonContainer}>
          <IconButton
            icon="trash-can-outline"
            color="red"
            size={25}
          // onPress={() => navigation.navigate('Login')}
          />
          <IconButton
            icon="pencil"
            size={25}
          // onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
      )


}

const vehiculos = [
  { id: 1, patente: 'bcx-333' },
  { id: 2, patente: 'cxc-444' },
  { id: 3, patente: 'kkk-222' }
]