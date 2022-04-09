/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import { StyleSheet, View } from 'react-native';
 import MapboxGL from '@rnmapbox/maps';
 import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

MapboxGL.setAccessToken('pk.eyJ1IjoiZXplYWtlbCIsImEiOiJjbDFyZGkzeGkwdmFhM2psbTRiZjNzZ252In0.lzoXhYbHmRVbuWyT3hNqiw');
 
const permissionRequest = () => {
  requestMultiple(
    [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
     PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
     PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
     PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
     PERMISSIONS.ANDROID.CAMERA
    ])
}

 export default function App() {
    permissionRequest()
     return (
       <View style={styles.page}>
         <View style={styles.container}>
           <MapboxGL.MapView style={styles.map} >
            <MapboxGL.UserLocation androidRenderMode="gps" visible={true} />
            <MapboxGL.Camera followUserLocation={true} />
           </MapboxGL.MapView >
         </View>
       </View>
     );
   }

   const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    container: {
      height: "100%",
      width: "100%",
      backgroundColor: 'white'
    },
    map: {
      flex: 1
    }
  });
 