import { View, Text, TouchableOpacity,Keyboard ,TouchableWithoutFeedback  } from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';
import styles from '../styles/styles'
import OlvidoSuContrasenia from './../components/OlvidoSuContraseniaDialog';
import { logear } from '../api/http';
import { useTheme } from 'react-native-paper';
import GlobalButton from './../components/GlobalButton';

const Login = ({ navigation }) => {
    const [visibleOlvidoSuContrasenia, setVisibleOlvidoSuContrasenia] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const theme = useTheme();
    const loginHandler = () => {
        logear(username, password).then(response => {
            console.log(response);navigation.navigate('MainScreen');})
            .catch(error => {console.log(error)})
    }
    const registerNavigation = () => {
        navigation.navigate("Registrarse")
    }
    const olvidoSuContraseniaHelper = () =>{
        setVisibleOlvidoSuContrasenia(!visibleOlvidoSuContrasenia)
    }   

    return (
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}  >
        <View  style ={styles.containerLogin}  >
            <Text style={[{color:theme.colors.secondary},styles.loguito]} >RampApp</Text>

            <View style = {styles.inputView}>
                <TextInput
                    theme={{colors:{placeholder:theme.colors.text,background:theme.colors.input}}}
                    outlineColor={theme.colors.input}
                    activeOutlineColor={theme.colors.text}
                    mode="outlined"
                    label={"Usuario"}
                    value={username}
                    onChangeText={value => setUsername(value)}
                />
            </View>
            <View style = {styles.inputView}>
                <TextInput secureTextEntry
                    theme={{colors:{placeholder:theme.colors.text,background:theme.colors.input}}}
                    outlineColor={theme.colors.input}
                    activeOutlineColor={theme.colors.text}
                    mode="outlined"
                    label={"Contraseña"}
                    value={password}
                    onChangeText={value => setPassword(value)}
                />
            </View>
            {GlobalButton("",{color: theme.colors.text},"Olvido su contraseña?",olvidoSuContraseniaHelper)}
            {OlvidoSuContrasenia(visibleOlvidoSuContrasenia,setVisibleOlvidoSuContrasenia)} 
            {GlobalButton([styles.loginButton,{ backgroundColor: theme.colors.secondary}],{color: theme.colors.secondaryText},"INGRESAR",loginHandler)}
            {GlobalButton("",{color: theme.colors.text},"Registrarse",registerNavigation)}
            
        </View>
        </TouchableWithoutFeedback >
    )
}
export default Login;

