import React from 'react';
import { Appbar, Text, useTheme } from 'react-native-paper';

const Header = (titulo,path,navigation,_styles) => {
    const theme = useTheme();

return (
    <Appbar.Header statusBarHeight={10} style={{backgroundColor:theme.colors.background}}>
      <Appbar.BackAction size={30} color= {theme.colors.text} onPress={() => {navigation.navigate(path)}} />
      <Text style={[{color:theme.colors.text},_styles]}>{titulo}</Text>
    </Appbar.Header>
)

}

export default Header;