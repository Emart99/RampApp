import React, {useState} from 'react';
import styles from '../styles/styles';
import {View, Text, TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {IconButton,TextInput} from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { registrar } from '../api/http';
import { themeHelper } from './../styles/styles';
import GlobalButton from './../components/GlobalButton';
import { useTheme } from 'react-native-paper';


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
    // console.log(
    //   'usuario: ' + usuario,
    //   '\ncontraseña: ' + contraseña,
    //   '\nemail: ' + email,
    //   '\nnombre: ' + nombre,
    //   '\napellido: ' + apellido,
    //   '\nfechaNacimiento: ' + fechaNacimiento,
    //   '\ndni: ' + dni,
    // );
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
      <View style={styles.inputView}>
        <TextInput
         outlineColor={theme.colors.input}
         activeOutlineColor={theme.colors.input}
          mode='outlined'
          label="Usuario"
          value={usuario}
          onChangeText={value => setUsuario(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
         outlineColor={theme.colors.input}
         activeOutlineColor={theme.colors.input}
        mode='outlined'
          secureTextEntry
          label="Contraseña"
          value={contraseña}
          onChangeText={value => setContraseña(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
         outlineColor={theme.colors.input}
         activeOutlineColor={theme.colors.input}
        mode='outlined'
          secureTextEntry
          label="Confirmar contraseña"
          value={confirmarContraseña}
          onChangeText={value => setConfirmarContraseña(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
         outlineColor={theme.colors.input}
         activeOutlineColor={theme.colors.input}
        mode='outlined'
        label="Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
         outlineColor={theme.colors.input}
         activeOutlineColor={theme.colors.input}
        mode='outlined'
        label="Nombre"
          value={nombre}
          onChangeText={value => setNombre(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
         outlineColor={theme.colors.input}
         activeOutlineColor={theme.colors.input}
        mode='outlined'
        label="Apellido"
          
          value={apellido}
          onChangeText={value => setApellido(value)}
        />
      </View>
      {/* Date Picker */}

      <TouchableOpacity
        style={styles.inputView}
        onPress={e => {
          setShowDatePicker(true);
        }}>
          
        <TextInput
          outlineColor={theme.colors.input}
          activeOutlineColor={theme.colors.input}
          disabled
          mode='outlined'
          style={
            
            [{color:theme.colors.text},styles.dateText]
          }>{"Fecha de nacimiento: "+`${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth()}/${fechaNacimiento.getFullYear()}`}</TextInput>
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
      <View style={styles.inputView}>
        <TextInput
         outlineColor={theme.colors.input}
         activeOutlineColor={theme.colors.input}
        mode='outlined'
        label="DNI"
          value={dni}
          onChangeText={value => setDni(value)}
        />
      </View>


      {GlobalButton([styles.loginButton,{ backgroundColor: theme.colors.secondary}],{color: theme.colors.secondaryText},"REGISTRAR",registerHelper)} 
    </View>
   
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
    
  );
};

export default Registrarse;
