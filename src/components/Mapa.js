import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SheetManager } from 'react-native-actions-sheet';
import RampasSheets from './RampasSheets';
import {styles} from '../styles/mapSyles';


const Mapa = () => {
    const theme = useTheme()
    return (
        <>
            <View >
                <MapView 
                followsUserLocation={true}
                customMapStyle={theme.mapStyles}
                showsCompass={false}
                toolbarEnabled={false}
                moveOnMarkerPress={false}
                minZoomLevel={14}
                maxZoomLevel={20}
                showsUserLocation={true}
                showsMyLocationButton={false}
 
                initialRegion={{
                    latitude: -34.5762765,
                    longitude: -58.5388435,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} style={styles.map} >

                    <Marker  onPress={() => SheetManager.show('rampas_bottom_sheet')} coordinate={{
                        latitude: -34.56009155102,
                        longitude: -58.562973959184
                    }} >
                        <Image source={require("../assets/garage.png")} />
                    </Marker>
                </MapView>
                <RampasSheets/>
            </View>
        </>
    )
}
export default Mapa;
