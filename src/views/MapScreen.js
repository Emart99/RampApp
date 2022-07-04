import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";
import Mapa from "../components/Mapa";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MapScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ paddingTop: insets.top }, styles.page]}>
      <View style={styles.containerMap}>
        <Mapa />
      </View>
    </View>
  );
};
export default MapScreen;
