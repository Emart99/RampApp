import React, {useState,useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { IconButton,useTheme } from "react-native-paper";
import { traerVehiculos } from '../api/http';
import cardStyles from "../styles/cardStyles";
import  vehiculoStyles  from "../styles/vehiculoStyles";


const AdministrarVehiculo = () => {
  const theme = useTheme();
  // const [vehiculos, setVehiculos] = useState([])

  // useEffect(() => {
  //   traerVehiculos().then(response => {setVehiculos(response)});
  // },[]);

  return (
    <>
      <Text style={[{color:theme.colors.text},cardStyles.titulo]}>Vehiculo</Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {vehiculos.map(vehiculo => VehiculoCard(theme,vehiculo))}
      </ScrollView>
      <TouchableOpacity
         style={[{backgroundColor:theme.colors.secondary},cardStyles.agregarButton]}
         onPress={() => console.log('Pressed')}>
         <Text style={{textAlign: 'center',color:theme.colors.secondaryText,padding:5}}>AGREGAR</Text>
      </TouchableOpacity>
    </>

  )
}
export default AdministrarVehiculo;

const VehiculoCard = (theme,vehiculo) => {
  return (
      <View style={[{backgroundColor:theme.colors.headerPerfil},vehiculoStyles.card,vehiculoStyles.elevation]}>
        <IconButton
          icon="car"
          color="black"
          size={50}
        // onPress={() => navigation.navigate('Login')}
        />

        <Text style={[{color:theme.colors.text},vehiculoStyles.text]}>{vehiculo.patente}</Text>
        <View style={vehiculoStyles.buttonContainer}>
          <IconButton
            icon="trash-can-outline"
            color="red"
            size={25}
          // onPress={() => navigation.navigate('Login')}
          />
          <IconButton
            icon="pencil"
            color="black"
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