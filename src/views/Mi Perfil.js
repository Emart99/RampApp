import { Text,Avatar,Switch,Divider, useTheme   } from "react-native-paper"
import {View,TouchableOpacity,ScrollView } from "react-native"
import React, {useEffect, useState} from 'react';
import styles from '../styles/styles'
import { traerUsuario } from "../api/http";
import { PreferencesContext } from "../themeContext";
import GlobalButton from './../components/GlobalButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const MiPerfil = ({navigation}) =>{
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
    let temaString = isThemeDark ? "Oscuro" : "Claro"

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        toggleTheme()
    };
    const [usuario,setUsuario] = useState('')
    useEffect(() => {
        traerUsuario(6).then(response => {setUsuario(response)});
      },[]);

    const loginNavigation = () =>{
        navigation.navigate("Login")
    }
    const administrarVehiculoNavigation= () =>{
        navigation.navigate("AdministrarVehiculo")
    }
    const administrarRampaNavigation= () =>{
        navigation.navigate("AdministrarRampa")
    }

    return(
        
        <ScrollView  style={[{marginTop:insets.top},styles.containerPerfil]}>
            
            <View  style={[{backgroundColor:theme.colors.headerPerfil},styles.containerHeaderPerfil]}>
                <Avatar.Icon size={150} style={{marginTop:15}} icon="account" />
                <Text style={[{color:theme.colors.text},styles.perfilHeaderText]}>{usuario.userName}</Text>
                <Text style={[{color:theme.colors.text},styles.perfilText]}>{usuario.email}</Text>
            </View>
            <View style={{flex:1, marginTop:20, padding:15}}>
                <Text style={styles.perfilContentText}>Informacion Personal</Text>
                <Text style={styles.perfilMiniContentText}>Nombre: {usuario.nombre}</Text>
                <Text style={styles.perfilMiniContentText}>Apellido: {usuario.apellido}</Text>
                <Text style={styles.perfilMiniContentText}>Fecha De Nacimiento: {usuario.fechaDeNacimiento}</Text>
                <Text style={styles.perfilMiniContentText}>DNI: {usuario.dni}</Text>
                <Text style={styles.perfilMiniContentText}>Cambiar Contrasenia</Text>

                <Text style={[{marginTop:20},styles.perfilContentText]}>Ajustes</Text>
                <View style={styles.alinearSwitch}>
                    <Text style={styles.perfilMiniContentText}>Tema: {temaString}</Text>
                    <Switch value={isThemeDark} onValueChange={onToggleSwitch}/>
                </View>

                {GlobalButton([styles.perfilButton,{ backgroundColor: theme.colors.secondary,marginTop:20}],{color: theme.colors.secondaryText},"Administrar Rampas",administrarRampaNavigation)}
                {GlobalButton([styles.perfilButton,{ backgroundColor: theme.colors.secondary,marginTop:10}],{color: theme.colors.secondaryText},"Administrar Vehiculo",administrarVehiculoNavigation)}
                {GlobalButton([{ backgroundColor: theme.colors.secondary, marginTop:20},styles.perfilButton],{color: theme.colors.secondaryText},"CERRAR SESION",loginNavigation)} 

            </View>
        </ScrollView >
       
        
    )
}

export default MiPerfil;