import React from "react";
import {
  Card,
  Paragraph,
  Avatar,
  IconButton,
  TextInput,
} from "react-native-paper";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";

import newCardStyles from "../../styles/newCardStyles";
import { denunciarInfractor, subirImagen } from "../../api/http";

const CardReserva = (
  reserva,
  theme,
  showAlertDenuncia,
  setShowAlertDenuncia,
  visibleToast,
  setVisibleToast,
  dominioDenunciado,
  setDominioDenunciado,
  enviandoDenuncia,
  setEnviandoDenuncia
) => {
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
    setEnviandoDenuncia(true);
    if (!result.cancelled) {
      const imagen = await subirImagen(result.base64).catch((err) => {});
      await denunciarInfractor(
        "Estacionamiento ocupado",
        imagen.data.link,
        dominioDenunciado,
        `${reserva.calle} ${reserva.altura}`
      ).then((data) => {
        onToggleSnackBar();
      });
    }
    setDominioDenunciado("");
  };

  const onToggleSnackBar = () => setVisibleToast(!visibleToast);

  return (
    <Card
      key={reserva.id}
      style={[
        newCardStyles.card,
        { backgroundColor: theme.colors.headerPerfil },
      ]}
      elevation={10}
    >
      <AwesomeAlert
        titleStyle={{
          width: "100%",
          textAlign: "center",
          color: theme.colors.text,
        }}
        contentContainerStyle={{ backgroundColor: theme.colors.modal }}
        confirmButtonTextStyle={{ color: theme.colors.secondaryText }}
        show={showAlertDenuncia}
        showProgress={enviandoDenuncia}
        title="Denunciar infractor"
        message={
          enviandoDenuncia
            ? "Por favor, espere..."
            : "Ingrese el dominio del infractor y luego saque una foto de la infracción"
        }
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Sacar foto"
        confirmButtonColor={theme.colors.secondary}
        onConfirmPressed={() => {
          enviarDenuncia().then(() => {
            setEnviandoDenuncia(false);
            setShowAlertDenuncia(false);
            onToggleSnackBar();
          });
        }}
        showCancelButton={true}
        cancelText="Cancelar"
        cancelButtonTextStyle={{ color: theme.colors.text }}
        cancelButtonStyle={{
          borderColor: theme.colors.secondary,
          borderWidth: 1,
          borderStyle: "solid",
        }}
        onCancelPressed={() => {
          setShowAlertDenuncia(false);
        }}
        closeOnTouchOutside={false}
        customView={
          <View
            style={{
              width: "100%",
              height: 20,
              marginTop: 25,
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            <TextInput
              theme={{
                colors: {
                  placeholder: theme.colors.text,
                  background: theme.colors.background,
                },
              }}
              underlineColor={theme.colors.text}
              activeUnderlineColor={theme.colors.text}
              style={{ backgroundColor: theme.colors.modal, fontSize: 12 }}
              mode="flat"
              label="Dominio a denunciar"
              value={dominioDenunciado}
              disabled={enviandoDenuncia}
              onChangeText={(value) => setDominioDenunciado(value)}
            />
          </View>
        }
      />
      <Card.Title
        style={{ marginTop: 10 }}
        title={`${reserva.calle} ${reserva.altura}`}
        left={(props) => (
          <Avatar.Icon {...props} icon="map-marker" color={theme.colors.text} />
        )}
        right={(props) => (
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
        source={{ uri: reserva && reserva.imagenRampa }}
      />
      <Card.Content style={newCardStyles.container}>
        <View style={newCardStyles.innerContainer}>
          <Avatar.Icon
            size={40}
            icon="clock"
            color={theme.colors.text}
            style={{ marginLeft: 5, marginRight: 5 }}
          />
          <Paragraph style={newCardStyles.font}>
            Desde: {reserva.horaInicioReserva}:00
          </Paragraph>
          <Paragraph style={[newCardStyles.font, { marginLeft: 15 }]}>
            Hasta: {reserva.horaFinReserva}:00
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardReserva;
