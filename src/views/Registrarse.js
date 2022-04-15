import React from 'react';
import styles from '../styles/styles'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
const Registrarse = ({ navigation }) =>{
    return(
        
        <View style ={styles.containerLogin}>
             <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Usuario"
                />
            </View>
            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Contraseña"
                />
            </View>
            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                />
            </View>
            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Nombre"
                />
            </View>
            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Apellido"
                />
            </View>
            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Fecha de nacimiento"
                />
            </View>

            <TouchableOpacity style = {styles.loginBtn}
            onPress={() => navigation.navigate('Login')}>
                <Text >REGISTRAR</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Registrarse;