import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import MapScreen from './MapScreen'
import MiPerfil from './Mi Perfil'
import Carrito from './Carrito';
import AdministrarReservas from './ReservasActivas'



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
