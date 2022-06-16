import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { IconButton, useTheme } from "react-native-paper";

import CrearVehiculo from "../components/modales/CrearVehiculo";
import cardStyles from "../styles/cardStyles";
import vehiculoStyles from "../styles/vehiculoStyles";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { borrarVehiculo, traerVehiculo, traerVehiculosDelUsuario } from "../api/http";
import EditarVehiculo from './../components/modales/EditarVehiculo';


const AdministrarVehiculo = () => {
  const theme = useTheme();
  const [vehiculos, setVehiculos] = useState([])
  const [visibleCrear, setVisibleCrear] = React.useState(false);
  const [visibleEditar,setVisibleEditar] = React.useState(false);
  const [onPressRefresh,setOnPressRefresh] = React.useState(false);
  const insets = useSafeAreaInsets();
  const showModal = () => setVisibleCrear(true);
  
  const vehiculoBorrar = async (vehiculo) => {
    await borrarVehiculo(vehiculo).then(data => setOnPressRefresh(!onPressRefresh)) // aca falta el id
  }

  useEffect(() => {
    async function fetchVehiculos() {
      const vehiculos = await traerVehiculosDelUsuario()
      if (vehiculos != undefined) {
        setVehiculos(vehiculos)
      }
    }
    fetchVehiculos()
  }, [onPressRefresh]);



  return (
    <>
      <Text style={[{ color: theme.colors.text, paddingTop: insets.top }, cardStyles.titulo]}>Vehiculo</Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {vehiculos.map(vehiculo => { return(
          <View key={vehiculo.id} style={[{ backgroundColor: theme.colors.headerPerfil }, vehiculoStyles.card, vehiculoStyles.elevation]}>
            <IconButton
              icon="car"
              color="black"
              size={50}
            />

            <Text style={[{ color: theme.colors.text }, vehiculoStyles.text]}>{vehiculo.dominio}</Text>
            <View style={vehiculoStyles.buttonContainer}>
              <IconButton
                icon="trash-can-outline"
                color="red"
                size={25}
                onPress={() => vehiculoBorrar(vehiculo)}
              />
              <IconButton 
                icon="pencil"
                color="black"
                size={25}
                onPress={() => setVisibleEditar(true)}
              />
               {EditarVehiculo(visibleEditar,setVisibleEditar,theme,vehiculo,setOnPressRefresh,onPressRefresh)}   
            </View>
          </View>
      )})}
      </ScrollView>
      <TouchableOpacity
        style={[{ backgroundColor: theme.colors.secondary }, cardStyles.agregarButton]}
        onPress={showModal}>
        <Text style={{ textAlign: 'center', color: theme.colors.secondaryText, padding: 5 }}>AGREGAR</Text>
      </TouchableOpacity>
      {CrearVehiculo(visibleCrear, setVisibleCrear,onPressRefresh,setOnPressRefresh)}
    </>
  )
}
export default AdministrarVehiculo;

