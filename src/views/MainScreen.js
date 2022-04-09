import Mapa from "../components/Mapa"
import {  View } from 'react-native';
import React, { Component } from 'react';
import  styles  from "../styles/stylesFalopa";


const MainScreen = () =>{    
    return(
        <View style={styles.page}>
            <View style={styles.container}>
            <Mapa />
            </View>
        </View>
    )
}

export default MainScreen;
 