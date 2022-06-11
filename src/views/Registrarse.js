import React, {useState} from 'react';
import styles from '../styles/styles';
import {View, Text, TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {IconButton,TextInput} from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { registrar } from '../api/http';
import GlobalButton from './../components/GlobalButton';
import { useTheme } from 'react-native-paper';
import GlobalInput from '../components/GlobalInput';


const Registrarse = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [dni, setDni] = useState("");
  const theme = useTheme();

  const handleSubmit = () => {
    const registro = {
      nombre: nombre, apellido: apellido, dni: dni, fechaDeNacimiento: fechaNacimiento, userName: usuario,
      contrasenia: contraseña, email: email
    }
    registrar(registro).then(resp => console.log(resp))
    .catch(error => console.log(error))
  };

  const registerHelper = () =>{
    handleSubmit();
    navigation.navigate('Login');
  }

  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}  >
      
    <View style={styles.containerLogin}>
      <IconButton
        style={[styles.backIcon,{transform: [{rotateY: '180deg'}]}]}
        color= {theme.colors.text}
        icon="login"
        inline={true}
        size={35}
        onPress={() => navigation.navigate('Login')}
      />
      <Text style={[{color:theme.colors.text},styles.crearText]}> Crear cuenta </Text>
      {GlobalInput('Usuario',usuario,setUsuario,styles.inputView,false,'default')}
      {GlobalInput('Contraseña',contraseña,setContraseña,styles.inputView,true,'default')}
      {GlobalInput('Confirmar contraseña',confirmarContraseña,setConfirmarContraseña,styles.inputView,true,'default')}
      {GlobalInput('Email',email,setEmail,styles.inputView,false,'email-address')}
      {GlobalInput('Nombre',nombre,setNombre,styles.inputView,false,'default')}
      {GlobalInput('Apellido',apellido,setApellido,styles.inputView,false,'default')}
      
      {/* Date Picker */}

      <TouchableOpacity
        style={styles.inputView}
        onPress={e => {
          setShowDatePicker(true);
        }}>
        <TextInput
          mode='outlined'
          editable={false} 
          outlineColor='transparent'
          theme={{colors:{placeholder:theme.colors.text,background:theme.colors.input}}}>
          {"Fecha de nacimiento: "+`${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth()}/${fechaNacimiento.getFullYear()}`}
        </TextInput>
      </TouchableOpacity>
      
      {showDatePicker && (
        <RNDateTimePicker
          mode="date"
          name="fechaNacimiento"
          value={fechaNacimiento}
          onChange={(event, value) => {
            setShowDatePicker(false);
            setFechaNacimiento(value);
          }}
        />
      )}
      {/* Date Picker */}

      {GlobalInput('DNI',dni,setDni,styles.inputView,false,'number-pad')}
      {GlobalButton([styles.loginButton,{ backgroundColor: theme.colors.secondary}],{color: theme.colors.secondaryText},"REGISTRAR",registerHelper)} 
    </View>
   
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
    
  );
};

export default Registrarse;
