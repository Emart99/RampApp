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

 MapboxGL.setAccessToken('pk.eyJ1IjoiZXplYWtlbCIsImEiOiJjbDFyZGkzeGkwdmFhM2psbTRiZjNzZ252In0.lzoXhYbHmRVbuWyT3hNqiw');
 


 export default function App() {
  
     return (
       <View style={styles.page}>
           
         
         <View style={styles.container}>
           <MapboxGL.MapView style={styles.map} />
           <MapboxGL.UserLocation androidRenderMode="normal"  visible={true}/>
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
      backgroundColor: 'tomato'
    },
    map: {
      flex: 1
    }
  });
 