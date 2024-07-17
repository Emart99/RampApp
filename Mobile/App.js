/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  LogBox, useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { PreferencesContext } from "./src/themeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AdministrarVehiculo from "./src/views/AdministrarVehiculo";
import AdministrarRampa from "./src/views/AdministrarRampa";
import MiPerfil from "./src/views/Mi Perfil";
import MainScreen from "./src/views/MainScreen";
import Registrarse from "./src/views/Registrarse";
import Login from "./src/views/Login";
import { LightTheme } from "./src/styles/styles";
import { _DarkTheme } from "./src/styles/styles";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

LogBox.ignoreLogs([""]); // codigo hermoso, remplazar en un futuro

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
  let { status } = Location.requestForegroundPermissionsAsync();
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  let colorScheme = useColorScheme();
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

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
        // experience.
        await new Promise((resolve) => setTimeout(resolve, 2000));
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                index={0}
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Registrarse"
                component={Registrarse}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Perfil"
                component={MiPerfil}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Rampas"
                component={AdministrarRampa}
                options={{
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: theme.colors.background },
                  headerTitleStyle: {
                    fontFamily: "Poppins_400Regular",
                    fontSize: 34,
                  },
                }}
              />
              <Stack.Screen
                name="Vehiculos"
                component={AdministrarVehiculo}
                options={{
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: theme.colors.background },
                  headerTitleStyle: {
                    fontFamily: "Poppins_400Regular",
                    fontSize: 34,
                  },
                }}
              />
              <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                initialParams={{ id: 32 }}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
}
