import React ,{ useState,useRef,useCallback }from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SheetManager } from 'react-native-actions-sheet';
import RampasSheets from './RampasSheets';
import {styles} from '../styles/mapSyles';
import {traerRampas} from "../api/http"
import { useFocusEffect } from '@react-navigation/native';




const Mapa = () => {
    const theme = useTheme()
    const [rampas,setRampas] = useState([])
    const [rampaId,setRampaId] = useState(0)
    const actionSheetRef = useRef(null);
    useFocusEffect(useCallback(()=>{
        const fetchRampas = async () =>{
            const ramp = await traerRampas()
            setRampas(ramp)
        }
        
        const interval = setInterval(() => {
            fetchRampas()
          }, 5000);
          return () => clearInterval(interval);
        
        console.log(rampas)
    }
    ,[]))
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
                    
                   {rampas.map((rampa)=>{
                    return(
                     <Marker key={rampa.id}  onPress={() => {
                        SheetManager.show('rampas_bottom_sheet')
                        setRampaId(rampa.id)
                    
                    }} coordinate={{
                        latitude: parseFloat(rampa.posx),
                        longitude: parseFloat(rampa.posy)
                    }} >
                        <Image source={require("../assets/garage.png")} />
                    </Marker>
                    )
                   })}
                </MapView>
                {RampasSheets(rampaId,theme,actionSheetRef)}
            </View>
        </>
    )
}
export default Mapa;

