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
 import Registrarse from "./src/views/Registrarse"
 import Login from './src/views/Login'
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

const permissionRequest = () => {
  requestMultiple(
    [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
     PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
     PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
     PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
     PERMISSIONS.ANDROID.CAMERA
    ])
}
const Stack = createNativeStackNavigator();

 export default function App() {
    permissionRequest()
     return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Registrarse" component={Registrarse} options={{ headerShown: false }}/>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
     );
   }
