import * as React from 'react';
import {
  Card,
  Paragraph,
  Avatar,
  IconButton,
} from 'react-native-paper';
import {View} from 'react-native';

import newCardStyles from '../../styles/newCardStyles';

const CardReserva = (reserva, theme) => {
  return (
    <Card
      key={reserva.id} style={[newCardStyles.card, {backgroundColor: theme.colors.headerPerfil}]}
      elevation={10}>
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
            onPress={() => console.log('zz')}
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
