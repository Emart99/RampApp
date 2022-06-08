import React, { Component } from 'react';
import MapScreen from './MapScreen'
import MiPerfil from './Mi Perfil'
import styles from '../styles/styles'
import Carrito from './Carrito';
import AdministrarReservas from './ReservasActivas'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';



const MainScreen = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const Tab = createMaterialBottomTabNavigator();
    const theme = useTheme();

    return (
        
    <Tab.Navigator barStyle={ {backgroundColor:theme.colors.secondary} }>
        <Tab.Screen options={{tabBarIcon:'map-marker'}} name="Rampas" component={MapScreen} />
        <Tab.Screen options={{tabBarIcon:'alpha-r-circle'}} name="Reservas" component={AdministrarReservas} />
        <Tab.Screen options={{tabBarIcon:'cart'}} name="Carrito" component={Carrito} />
        <Tab.Screen options={{tabBarIcon:'account'}} name="Mi Perfil" component={MiPerfil} />
    </Tab.Navigator>
    )
}

export default MainScreen;
