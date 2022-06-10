import React from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

const GlobalInput = (_label, _value, _func,_style,_secure,_keyboardType) => {
    const theme = useTheme();
       return (
            <View style = {_style}>
                <TextInput
                    secureTextEntry={_secure}
                    theme={{colors:{placeholder:theme.colors.text,background:theme.colors.input}}}
                    outlineColor={theme.colors.input}
                    activeOutlineColor={theme.colors.text}
                    mode="outlined"
                    label={_label}
                    value={_value}
                    onChangeText={value => _func(value)}
                    keyboardType={_keyboardType}
                />
            </View>
       ) 
}

export default GlobalInput;