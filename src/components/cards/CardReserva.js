import * as React from 'react';
import {
  Card,
  Paragraph,
  Avatar,
  IconButton,
} from 'react-native-paper';
import {View} from 'react-native';

import newCardStyles from '../../styles/newCardStyles';
import  AwesomeAlert  from 'react-native-awesome-alerts';
import { useState } from 'react';

const CardReserva = (reserva, theme) => {
  const [showAlertDatosCorrectos,setShowAlertDatosCorrectos] = useState(false)
  return (
    <Card
      key={reserva.id} style={[newCardStyles.card, {backgroundColor: theme.colors.headerPerfil}]}
      elevation={10}>
        <AwesomeAlert
            titleStyle={{ width: "100%",textAlign:'center', color: theme.colors.text }}
            contentContainerStyle={{ backgroundColor: theme.colors.background }}
            confirmButtonTextStyle={{color:theme.colors.secondaryText}}
            show={showAlertDatosCorrectos}
            showProgress={false}
            title="Denunciar infractor!"
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Sacar foto"
            confirmButtonColor={theme.colors.secondary}
            closeOnTouchOutside={false}
            onConfirmPressed={() => {
              setShowAlertDatosCorrectos(false);
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
            onPress={() => setShowAlertDatosCorrectos(true)}
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
