import Mapa from "../components/Mapa"
import {  View } from 'react-native';
import React, { Component } from 'react';
import  styles  from "../styles/styles";


const MainScreen = ({navigation}) =>{    
    return(
        <View style={styles.page}>
            <View style={styles.containerMap}>
            <Mapa />
            </View>
        </View>
    )
}

export default MainScreen;
 