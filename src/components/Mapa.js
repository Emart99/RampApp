import MapboxGL from '@rnmapbox/maps';
import React from 'react';
import styles from '../styles/stylesFalopa'

MapboxGL.setAccessToken('pk.eyJ1IjoiZXplYWtlbCIsImEiOiJjbDFyZGkzeGkwdmFhM2psbTRiZjNzZ252In0.lzoXhYbHmRVbuWyT3hNqiw');
const Mapa = () =>{
    
    return(
        <MapboxGL.MapView style={styles.map} >
            <MapboxGL.UserLocation androidRenderMode="gps" visible={true} />
            <MapboxGL.Camera followUserLocation={true} />
        </MapboxGL.MapView >
    )
}

export default Mapa;