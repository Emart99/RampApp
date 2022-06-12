import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles'
import Mapa from '../components/Mapa'

const MapScreen = () =>{
   
    return(
        <View style={styles.page}>
            <View style={styles.containerMap}>
                <Mapa />     
            </View> 
        </View>
    )
}
export default MapScreen;