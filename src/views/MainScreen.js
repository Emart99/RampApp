import React, { Component } from 'react';
import { BottomNavigation } from 'react-native-paper';
import MiPerfil from './Mi Perfil';

import MapScreen from './MapScreen'
import styles from '../styles/styles'
import AdministrarRampa from './AdministrarRampa';
import AdministrarVehiculo from './AdministrarVehiculo';

const MainScreen = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'RampasDisponibles', title: 'Rampas Disp', icon: 'map-marker' },
        { key: 'AdminRampa', title:'Admin Rampa', icon:'parking' },
        { key: 'AdminVehiculo', title:'Admin Vehic', icon:'car'},
        { key: 'MiPerfil', title: 'Perfil', icon: 'account' },
    ])
    const renderScene = BottomNavigation.SceneMap({
        RampasDisponibles: MapScreen,
        AdminRampa: AdministrarRampa,
        AdminVehiculo:AdministrarVehiculo,
        MiPerfil: MiPerfil,
    });

    return (
        <BottomNavigation
            barStyle={ styles.mainScreenFooter }
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

export default MainScreen;
