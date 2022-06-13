import React from 'react';
import { View, Text, Keyboard ,TouchableWithoutFeedback  } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import styles from '../styles/styles'
import OlvidoSuContrasenia from './../components/OlvidoSuContraseniaDialog';
import { logear } from '../api/http';
import GlobalButton from './../components/GlobalButton';
import GlobalInput from '../components/GlobalInput';

const Login = ({ navigation }) => {
    const [visibleOlvidoSuContrasenia, setVisibleOlvidoSuContrasenia] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const theme = useTheme();

    const loginHandler = () => {
        // logear(username, password).then(response => {
            // console.log(response);
            navigation.navigate('MainScreen');
            // })
            // .catch(error => {console.log(error)})
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
            {GlobalInput("Usuario",username,setUsername,styles.inputView,false,'default')}
            {GlobalInput("Contraseña",password,setPassword,styles.inputView,true,'default')}
            <View style={{marginTop:10}}/>
            {GlobalButton("",{color: theme.colors.text},"Olvido su contraseña?",olvidoSuContraseniaHelper)}
            {OlvidoSuContrasenia(visibleOlvidoSuContrasenia,setVisibleOlvidoSuContrasenia)} 
            {GlobalButton([styles.loginButton,{ backgroundColor: theme.colors.secondary}],{color: theme.colors.secondaryText},"INGRESAR",loginHandler)}
            {GlobalButton("",{color: theme.colors.text},"Registrarse",registerNavigation)}
            
        </View>
        </TouchableWithoutFeedback >
    )
}
export default Login;

