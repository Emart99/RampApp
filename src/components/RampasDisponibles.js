import React from 'react';
import {View,Text,Image,StyleSheet } from 'react-native';
import styles from './../styles/styles';


const imgStyle = StyleSheet.create({
    imgRampa:{
        margin:'auto',
        width:'85%',
        borderRadius:15,
        
    }
})

const RampasDisponibles = () =>{
    return(
        <View style={{height:'100%'}}>
            {/* <Image
                style={styles.tinyLogo}
                source={{uri:'https://drive.google.com/file/d/1jLQynxQWJQ3jNHPxKyT3UTiNPB_-Lil4/view?usp=sharing'}}
                /> */}
            <Image
            style={imgStyle.imgRampa}
            source={require('../utils/casaBrunillo.png')}
            />
            <Text style={styles.inputText}>
                Hola, soy RampasDisponibles
            </Text>
        </View>
    )
}

export default RampasDisponibles;
