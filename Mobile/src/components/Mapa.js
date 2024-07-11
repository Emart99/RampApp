import React, { useState, useRef, useCallback, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SheetManager } from "react-native-actions-sheet";
import RampasSheets from "./RampasSheets";
import { styles } from "../styles/mapSyles";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { traerRampas } from "../api/http";

const Mapa = () => {
  const theme = useTheme();
  const [rampas, setRampas] = useState([]);
  const [rampaId, setRampaId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState({
    latitude: undefined,
    longitude: undefined,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const actionSheetRef = useRef(null);
  useFocusEffect(
    useCallback(() => {
      const fetchRampas = async () => {
        const ramp = await traerRampas();
        setRampas(ramp);
      };
      loc();

      const interval = setInterval(() => {
        if (!isOpen) {
          fetchRampas();
        }
      }, 3000);
      // se hace cada vez que se abre el tab, si quisieras que se haga solo en la primera vez, habria que usar un flag
      return () => clearInterval(interval);
    }, [isOpen])
  );
  useEffect(() => {
    const fetchRampas = async () => {
      const ramp = await traerRampas();
      setRampas(ramp);
    };
    loc();
    fetchRampas();
  }, []);

  const loc = async () => {
    const locate = await Location.getCurrentPositionAsync({});
    setLocation({
      ...location,
      latitude: locate.coords.latitude,
      longitude: locate.coords.longitude,
    });
  };

  return (
    <>
      <View>
        {location.latitude && (
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
            initialRegion={location}
            style={styles.map}
          >
            {rampas.map((rampa) => {
              return (
                <Marker
                  key={rampa.id}
                  onPress={() => {
                    SheetManager.show("rampas_bottom_sheet", {
                      value: rampa.id,
                    });
                    setRampaId(rampa.id);
                  }}
                  coordinate={{
                    latitude: parseFloat(rampa.posx),
                    longitude: parseFloat(rampa.posy),
                  }}
                >
                  <Image source={theme.mapIcon} />
                </Marker>
              );
            })}
          </MapView>
        )}
        {RampasSheets(theme, actionSheetRef, setIsOpen)}
      </View>
    </>
  );
};
export default Mapa;
