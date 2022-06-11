import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
const GlobalButton = (_stylesButton,_stylesText,texto,onPress) =>{
    const theme = useTheme();


    return (
        
        <TouchableOpacity onPress={onPress} style={_stylesButton}
        >
            <Text style={_stylesText}>{texto}</Text>
        </TouchableOpacity>
    )
}

export default GlobalButton;