import MapboxGL from '@rnmapbox/maps';
import React from 'react';
import styles from '../styles/styles'
import { SheetManager } from "react-native-actions-sheet";
import RampasSheets from './RampasSheets';
import { useTheme } from 'react-native-paper';

MapboxGL.setAccessToken('pk.eyJ1IjoiZXplYWtlbCIsImEiOiJjbDFyZGkzeGkwdmFhM2psbTRiZjNzZ252In0.lzoXhYbHmRVbuWyT3hNqiw');

const Mapa = () => {
    const theme = useTheme();
    return (
            <>
                <MapboxGL.MapView style={styles.map}
                    compassEnabled={false}
                    styleURL={theme.colors.mapHelper}>

                    <MapboxGL.UserLocation androidRenderMode="gps" visible={true} showsUserHeadingIndicator />
                    <MapboxGL.Camera followUserLocation={true}
                        maxZoomLevel={25}
                        minZoomLevel={7} />

                    <MapboxGL.PointAnnotation
                        id="test"
                        onSelected={() => SheetManager.show('rampas_bottom_sheet')}
                        coordinate={[-58.57745726877158, -34.54595351282419]} />
                    </MapboxGL.MapView>
                    
                    
                <RampasSheets/>
            </>
    )
}
export default Mapa;