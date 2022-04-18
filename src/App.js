/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, Component } from 'react';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import MainScreen from './views/MainScreen'
import Registrarse from "./views/Registrarse"
import Login from './views/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'
import { LogBox } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';



LogBox.ignoreLogs([""]) // codigo hermoso, remplazar en un futuro


const Stack = createNativeStackNavigator();
const Permisos = [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
PERMISSIONS.ANDROID.CAMERA]

export default function App() {
  useEffect(() => {
    const requestPermisos = async () => {
      const userResponse = await requestMultiple(Permisos);
      return userResponse
    }
    requestPermisos().then(SplashScreen.hide())
  }, [])

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Registrarse" component={Registrarse} options={{ headerShown: false }} />
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
