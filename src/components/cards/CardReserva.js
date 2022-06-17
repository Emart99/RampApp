import  React from 'react';
import {
  Card,
  Paragraph,
  Avatar,
  IconButton,
  Snackbar
} from 'react-native-paper';
import {View} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import  AwesomeAlert  from 'react-native-awesome-alerts';

import newCardStyles from '../../styles/newCardStyles';
import { denunciarInfractor, subirImagen } from '../../api/http';

const CardReserva = (reserva, theme, showAlertDenuncia, setShowAlertDenuncia, visibleToast, setVisibleToast) => {

  const enviarDenuncia = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se necesitan permisos para usar la cámara");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.cancelled) {
      const imagen = await subirImagen(result.base64).catch((err) => {});
      await denunciarInfractor("Estacionamiento ocupado", imagen.data.link,"",`${reserva.calle} ${reserva.altura}`).then(data => {onToggleSnackBar()})
    }
  }

  const onToggleSnackBar = () => setVisibleToast(!visibleToast);

  return (
    <Card
      key={reserva.id} style={[newCardStyles.card, {backgroundColor: theme.colors.headerPerfil}]}
      elevation={10}>     
        <AwesomeAlert
            titleStyle={{ width: "100%",textAlign:'center', color: theme.colors.text }}
            contentContainerStyle={{ backgroundColor: theme.colors.background }}
            confirmButtonTextStyle={{color:theme.colors.secondaryText}}
            show={showAlertDenuncia}
            showProgress={false}
            title="Denunciar infractor"
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Sacar foto"
            confirmButtonColor={theme.colors.secondary}
            closeOnTouchOutside={false}
            onConfirmPressed={() => {
              enviarDenuncia();
              setShowAlertDenuncia(false);
            }}
          />
      <Card.Title
        style={{marginTop: 10}}
        title={`${reserva.calle} ${reserva.altura}`}
        left={props => (
          <Avatar.Icon {...props} icon="map-marker" color={theme.colors.text} />
        )}
        right={props => (
          <IconButton
            icon="alert"
            color={theme.colors.text}
            onPress={() => setShowAlertDenuncia(true)}
          />
        )}
        titleNumberOfLines={2}
      />
      <Card.Cover
        style={newCardStyles.img}
        source={require('../../utils/casaBrunillo.png')}
      />
      <Card.Content style={newCardStyles.container}>
        <View style={newCardStyles.innerContainer}>
          <Avatar.Icon
            size={40}
            icon="clock"
            color={theme.colors.text}
            style={{marginLeft: 5, marginRight: 5}}
          />
          <Paragraph style={newCardStyles.font}>Desde: {reserva.desde}</Paragraph>
          <Paragraph style={[newCardStyles.font, {marginLeft: 15}]}>
            Hasta: {reserva.hasta}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardReserva;
