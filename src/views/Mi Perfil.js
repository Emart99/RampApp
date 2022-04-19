import { Text,Avatar  } from "react-native-paper"
import {View,Button} from "react-native"
import React from 'react';
import styles from '../styles/styles'


const MiPerfil = () =>{
    return(
       
            <View style={styles.containerLogin}>
                <Avatar.Icon size={100} icon="account" />
                <Text style={styles.loginText}>Nombre</Text>
            </View>
        
        
    )
}

export default MiPerfil;