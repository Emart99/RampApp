import React, { Component } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import MiPerfil from './Mi Perfil';
import Configuracion from './Configuracion';
import MapScreen from './MapScreen'

const MainScreen = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'RampasDisponibles', title: 'Rampas Disponibles', icon: 'map-marker' },
        { key: 'MiPerfil', title: 'Mi Perfil', icon: 'account' },
        { key: 'Configuracion', title: 'Configuracion', icon: 'account-settings-outline' },
    ])
    const renderScene = BottomNavigation.SceneMap({
        RampasDisponibles: MapScreen,
        MiPerfil: MiPerfil,
        Configuracion: Configuracion,
    });

    return (
        <BottomNavigation
            barStyle={{ backgroundColor: '#FFEC70' }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

export default MainScreen;
