import MapboxGL from '@rnmapbox/maps';
import React from 'react';
import styles from '../styles/styles'


MapboxGL.setAccessToken('pk.eyJ1IjoiZXplYWtlbCIsImEiOiJjbDFyZGkzeGkwdmFhM2psbTRiZjNzZ252In0.lzoXhYbHmRVbuWyT3hNqiw');
const Mapa = () =>{
    
    return(
        <MapboxGL.MapView   style={styles.map}
                            compassEnabled={false}
                            styleURL={MapboxGL.StyleURL.Dark}>
            
            <MapboxGL.UserLocation androidRenderMode="gps" visible={true} />
            <MapboxGL.Camera    followUserLocation={true}
                                maxZoomLevel={25}
                                minZoomLevel={7} />

            
            
                <MapboxGL.PointAnnotation 
                                        id="test"
                                        onSelected={()=>console.log("hola, fui presionado")}
                                        coordinate={[-58.57745726877158,-34.54595351282419]}/>
                                        
            
               
          
                       
          
            
        </MapboxGL.MapView>
    )
}
export default Mapa;