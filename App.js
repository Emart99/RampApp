/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, Component } from 'react';
 import { PERMISSIONS, request} from 'react-native-permissions';
 import MainScreen from './src/views/MainScreen'
 import Registrarse from "./src/views/Registrarse"
 import Login from './src/views/Login'
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import SplashScreen from 'react-native-splash-screen'
 import {LogBox} from "react-native";


LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'.",]) // codigo hermoso, remplazar en un futuro


const requestPermisos = () =>{
  request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  request(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION)
  request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
  request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
  request(PERMISSIONS.ANDROID.CAMERA)
  // requestMultiple no esta andando por alguna razon.
}
const Stack = createNativeStackNavigator();


 
 export default function App() {
   useEffect(() =>{
    SplashScreen.hide()
   })

   requestPermisos()
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
