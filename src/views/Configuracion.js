import { Text } from "react-native-paper"
import {View,Switch} from "react-native"
import React from 'react';
import styles from '../styles/styles'
const Configuracion = () =>{
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <View style={styles.containerLogin} >
            <View style={{display:'flex',flexDirection:'row'}}>
                <Text style={styles.loginText}>Tema:Oscuro</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    )
}

export default Configuracion;