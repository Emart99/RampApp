import React, {useState,useEffect} from "react";
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { IconButton,useTheme } from "react-native-paper";

import CrearVehiculo from "../components/modales/CrearVehiculo";
import cardStyles from "../styles/cardStyles";
import  vehiculoStyles  from "../styles/vehiculoStyles";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { borrarVehiculo, traerVehiculo } from "../api/http";
import EditarVehiculo from './../components/modales/EditarVehiculo';


const AdministrarVehiculo = () => {
  const theme = useTheme();
  // const [vehiculos, setVehiculos] = useState([])
  const [visible, setVisible] = React.useState(false);
  const insets = useSafeAreaInsets();
  // useEffect(() => {
    //   traerVehiculos().then(response => {setVehiculos(response)});
    // },[]);
    
    const showModal = () => setVisible(true);

  return (
    <>
      <Text style={[{color:theme.colors.text,paddingTop:insets.top},cardStyles.titulo]}>Vehiculo</Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {vehiculos.map(vehiculo => VehiculoCard(theme,vehiculo))}
      </ScrollView>
      <TouchableOpacity
         style={[{backgroundColor:theme.colors.secondary},cardStyles.agregarButton]}
         onPress={showModal}>
         <Text style={{textAlign: 'center',color:theme.colors.secondaryText,padding:5}}>AGREGAR</Text>
      </TouchableOpacity>
      {CrearVehiculo(visible,setVisible)}
    </>

  )
}
export default AdministrarVehiculo;

const VehiculoCard = (theme,vehiculo) => {
  const [visible,setVisible] = React.useState(false)

  const vehiculoBorrar = async () =>{
    await borrarVehiculo().then() // aca falta el id
  }
   

  return (
      <View key={vehiculo.id} style={[{backgroundColor:theme.colors.headerPerfil},vehiculoStyles.card,vehiculoStyles.elevation]}>
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
          onPress={() => vehiculoBorrar()}
          />
          <IconButton
            icon="pencil"
            color="black"
            size={25}
          onPress={() => setVisible(true)}
          />
         {EditarVehiculo(visible,setVisible)} 
        </View>
      </View>
      )


}

const vehiculos = [
  { id: 1, patente: 'bcx-333' },
  { id: 2, patente: 'cxc-444' },
  { id: 3, patente: 'kkk-222' }
]