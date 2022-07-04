import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const GlobalButton = (
  _stylesButton,
  _stylesText,
  texto,
  onPress,
  valid = true
) => {
  return (
    <TouchableOpacity onPress={onPress} style={_stylesButton} disabled={!valid}>
      <Text style={[{ fontFamily: "Poppins_300Light" }, _stylesText]}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
};

export default GlobalButton;
