import React, {useState} from 'react';
import styles from '../styles/styles';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import RNDateTimePicker from '@react-native-community/datetimepicker';

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

  const handleSubmit = event => {
    console.log(
      'usuario: ' + usuario,
      '\ncontraseña: ' + contraseña,
      '\nemail: ' + email,
      '\nnombre: ' + nombre,
      '\napellido: ' + apellido,
      '\nfechaNacimiento: ' + fechaNacimiento,
      '\ndni: ' + dni,
    );
    //mandar al service
  };

  return (
    <View style={styles.containerLogin}>
      <IconButton
        style={styles.backIcon}
        icon="keyboard-backspace"
        inline={true}
        onPress={() => navigation.navigate('Login')}
      />
      <Text style={styles.crearText}> Crear cuenta </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Usuario"
          name="username"
          value={usuario}
          onChangeText={value => setUsuario(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Contraseña"
          name="contraseña"
          value={contraseña}
          onChangeText={value => setContraseña(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirmar contraseña"
          name="confirmarContraseña"
          value={confirmarContraseña}
          onChangeText={value => setConfirmarContraseña(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          name="email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Nombre"
          name="nombre"
          value={nombre}
          onChangeText={value => setNombre(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Apellido"
          name="apellido"
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
        <Text
          style={
            styles.dateText
          }>{`${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth()}/${fechaNacimiento.getFullYear()}`}</Text>
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
          style={styles.inputText}
          placeholder="DNI"
          name="dni"
          value={dni}
          onChangeText={value => setDni(value)}
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={e => {
          handleSubmit(e);
          navigation.navigate('Login');
        }}>
        <Text>REGISTRAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registrarse;
