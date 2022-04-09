/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
 import MainScreen from './src/views/MainScreen'
 import { NavigationContainer } from '@react-navigation/native';

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
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
         
      
     );
   }
