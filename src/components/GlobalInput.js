import React from "react";
import { View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

const GlobalInput = (
  _label,
  _value,
  _func,
  _funcBlur,
  _style,
  _background,
  _secure,
  _keyboardType
) => {
  const theme = useTheme();
  return (
    <View style={_style}>
      <TextInput
        secureTextEntry={_secure}
        theme={{
          colors: {
            placeholder: theme.colors.globalInput,
            background: theme.colors.background,
          },
        }}
        underlineColor={theme.colors.globalInput}
        activeUnderlineColor={theme.colors.globalInput}
        style={{ backgroundColor: _background }}
        mode="flat"
        label={_label}
        value={_value}
        onChangeText={(value) => _func(value)}
        keyboardType={_keyboardType}
        onBlur={(value) => _funcBlur(value)}
      />
    </View>
  );
};

export default GlobalInput;
