import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../styles/styles'
import OlvidoSuContrasenia from './../components/OlvidoSuContraseniaDialog';
import { logear } from '../api/http';

const Login = ({ navigation }) => {
    const [visibleOlvidoSuContrasenia, setVisibleOlvidoSuContrasenia] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const loginHandler = () => {
        logear(username, password).then(response => {
            console.log(response);navigation.navigate('MainScreen');})
            .catch(error => {console.log(error)})
    }

    return (
        <View style ={styles.containerLogin}>
            <Text style={styles.loguito} >RampApp</Text>
            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Usuario"
                    value={username}
                    onChangeText={value => setUsername(value)}
                />
            </View>
            <View style = {styles.inputView}>
                <TextInput secureTextEntry
                    style={styles.inputText}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={value => setPassword(value)}
                />
            </View>
            <TouchableOpacity onPress={()=> {setVisibleOlvidoSuContrasenia(!visibleOlvidoSuContrasenia)}}>
                <Text style={styles.olvidoSuContrasenia}>Olvido su contraseña?</Text>
            </TouchableOpacity>
            {OlvidoSuContrasenia(visibleOlvidoSuContrasenia,setVisibleOlvidoSuContrasenia)} 
            
            <TouchableOpacity style = {styles.loginButton}
            onPress={loginHandler}>
                <Text >INGRESAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
                <Text style={styles.loginText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Login;

