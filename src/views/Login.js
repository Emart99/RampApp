import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../styles/styles'

const Login = ({ navigation }) => {
    return (
        <View style ={styles.containerLogin}>
            <Text style={styles.loguito} >RampApp</Text>
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
            <TouchableOpacity>
                <Text style={styles.olvidoSuContrasenia}>Olvido su contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.loginButton}
            onPress={() => navigation.navigate('MainScreen')}>
                <Text >INGRESAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
                <Text style={styles.loginText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Login;

