import React, { Component } from 'react';
import MapScreen from './MapScreen'
import MiPerfil from './Mi Perfil'
import styles from '../styles/styles'
import AdministrarRampa from './AdministrarRampa';
import AdministrarReservas from './ReservasActivas';
import AdministrarVehiculo from './AdministrarVehiculo';
import Carrito from './Carrito';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const MainScreen = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const Tab = createMaterialBottomTabNavigator();

    return (
        
    <Tab.Navigator barStyle={ styles.mainScreenFooter }>
        <Tab.Screen options={{tabBarIcon:'map-marker'}} name="Rampas Disponibles" component={MapScreen} />
        <Tab.Screen options={{tabBarIcon:'cart'}} name="Carrito" component={Carrito} />
        <Tab.Screen options={{tabBarIcon:'account'}} name="Mi Perfil" component={MiPerfil} />
      </Tab.Navigator>
    )
}

export default MainScreen;
