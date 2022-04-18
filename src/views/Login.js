import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../styles/styles'
import OlvidoSuContrasenia from './../components/OlvidoSuContraseniaDialog';

const Login = ({ navigation }) => {
    const [visibleOlvidoSuContrasenia, setVisibleOlvidoSuContrasenia] = React.useState(false);
    
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
                <TextInput secureTextEntry
                    style={styles.inputText}
                    placeholder="Contraseña"
                />
            </View>
            <TouchableOpacity onPress={()=> {setVisibleOlvidoSuContrasenia(!visibleOlvidoSuContrasenia)}}>
                <Text style={styles.olvidoSuContrasenia}>Olvido su contraseña?</Text>
            </TouchableOpacity>
            {OlvidoSuContrasenia(visibleOlvidoSuContrasenia,setVisibleOlvidoSuContrasenia)} 
            {/* Mejorar */}
            
            

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

