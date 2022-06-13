/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import {
  NavigationContainer,
} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from "react-native";
import {
  Provider as PaperProvider,
} from 'react-native-paper';
import { PreferencesContext } from './src/themeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AdministrarVehiculo from './src/views/AdministrarVehiculo';
import AdministrarRampa from './src/views/AdministrarRampa'
import MiPerfil from './src/views/Mi Perfil';
import MainScreen from './src/views/MainScreen'
import Registrarse from "./src/views/Registrarse"
import Login from './src/views/Login'
import { LightTheme } from './src/styles/styles';
import { _DarkTheme } from './src/styles/styles';
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

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  let { status } =  Location.requestForegroundPermissionsAsync();
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

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
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <SafeAreaProvider>
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Registrarse" component={Registrarse} options={{ headerShown: false }} />
            <Stack.Screen name="Perfil" component={MiPerfil} options={{ headerShown: false }} />
            <Stack.Screen name="AdministrarRampa" component={AdministrarRampa} options={{ headerShown: false }} />
            <Stack.Screen name="AdministrarVehiculo" component={AdministrarVehiculo} options={{ headerShown: false }} />
            <Stack.Screen name="MainScreen" component={MainScreen} initialParams={{ id: 32 }} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
}
