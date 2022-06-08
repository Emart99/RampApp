/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import MainScreen from './views/MainScreen'
import Registrarse from "./views/Registrarse"
import Login from './views/Login'
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'
import { LogBox } from "react-native";
import {
  Provider as PaperProvider,
} from 'react-native-paper';
import AdministrarVehiculo from './views/AdministrarVehiculo';
import AdministrarRampa from './views/AdministrarRampa'
import { PreferencesContext } from './themeContext';
import { LightTheme } from './styles/styles';
import { _DarkTheme } from './styles/styles';
LogBox.ignoreLogs([""]) // codigo hermoso, remplazar en un futuro


const CombinedDefaultTheme = {
  ...LightTheme,
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ..._DarkTheme,
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    ..._DarkTheme.colors,
  },
};

const Stack = createNativeStackNavigator();
const Permisos = [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                  PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
                  PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
                  PERMISSIONS.ANDROID.CAMERA]


export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  useEffect(() => {
    const requestPermisos = async () => {
      const userResponse = await requestMultiple(Permisos);
      return userResponse
    }
    requestPermisos().then(SplashScreen.hide())
  }, [])

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );






  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Registrarse" component={Registrarse} options={{ headerShown: false }} />
            <Stack.Screen name="AdministrarRampa" component={AdministrarRampa} options={{ headerShown: false }} />
            <Stack.Screen name="AdministrarVehiculo" component={AdministrarVehiculo} options={{ headerShown: false }} />
            <Stack.Screen name="MainScreen" component={MainScreen} initialParams={{ id: 32 }} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
