import { Text,Avatar,Switch,Divider   } from "react-native-paper"
import {View,TouchableOpacity,ScrollView } from "react-native"
import React, {useEffect, useState} from 'react';
import styles from '../styles/styles'
import { traerUsuario } from "../api/http";


const MiPerfil = ({navigation}) =>{
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [usuario,setUsuario] = useState('')
    useEffect(() => {
        traerUsuario(6).then(response => {setUsuario(response)});
      },[]);

    return(
        <ScrollView  style={styles.containerPerfil}>
            <View style={styles.containerHeaderPerfil}>
                <Avatar.Icon size={150} style={{marginTop:15,backgroundColor:'#333'}} icon="account" />
                <Text style={styles.perfilHeaderText}>{usuario.userName}</Text>
                <Text style={styles.perfilText}>{usuario.email}</Text>
            </View>
            <View style={{flex:1, marginTop:20, padding:15}}>
                <Text style={styles.perfilContentText}>Informacion Personal</Text>
                <Text style={styles.perfilMiniContentText}>Nombre: {usuario.nombre}</Text>
                <Text style={styles.perfilMiniContentText}>Apellido: {usuario.apellido}</Text>
                <Text style={styles.perfilMiniContentText}>Fecha De Nacimiento: {usuario.fechaDeNacimiento}</Text>
                <Text style={styles.perfilMiniContentText}>DNI: {usuario.dni}</Text>
                <Text style={styles.perfilMiniContentText}>Cambiar Contrasenia</Text>

                <Text style={styles.perfilContentText}>Ajustes</Text>
                <View style={styles.alinearSwitch}>
                    <Text style={styles.perfilMiniContentText}>Tema:Oscuro</Text>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch}/>
                </View>
                <View style={styles.alinearSwitch}>
                    <Text style={styles.perfilMiniContentText}>Notificaciones</Text>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('AdministrarRampa')} style = {styles.perfilButton}>
                    <Text style={{color:'black'}}>Administrar Rampas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AdministrarVehiculo')} style = {styles.perfilButton}>
                    <Text style={{color:'black'}}>Administrar Vehiculo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style = {styles.perfilButton}>
                    <Text style={{color:'black'}}>CERRAR SESION</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
       
        
    )
}

export default MiPerfil;