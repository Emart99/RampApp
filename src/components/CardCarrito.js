import * as React from 'react';
import {
  Card,
  Paragraph,
  Avatar,
  IconButton,
} from 'react-native-paper';
import {View} from 'react-native';
import newCardStyles from '../styles/newCardStyles';

const CardCarrito = (reserva, theme) => {
  return (
    <Card
      style={[newCardStyles.card, {backgroundColor: theme.colors.headerPerfil}]}
      elevation={10}>
      <Card.Title
        style={{marginTop: 10}}
        title={`${reserva.calle} ${reserva.altura}`}
        left={props => (
          <Avatar.Icon {...props} icon="map-marker" color={theme.colors.text} />
        )}
        right={props => (
          <IconButton
            icon="close"
            color={theme.colors.text}
            onPress={() => console.log('zz')}
          />
        )}
        titleNumberOfLines={2}
      />
      <Card.Cover
        style={newCardStyles.img}
        source={require('../utils/casaBrunillo.png')}
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
          <Paragraph style={[newCardStyles.font, {marginLeft: 10}]}>
            Hasta: {reserva.hasta}
          </Paragraph>
        </View>
        <View style={newCardStyles.innerContainer}>
          <Avatar.Icon size={50} icon="cash" color={theme.colors.text} />
          <Paragraph style={newCardStyles.font}>
            Precio: ${reserva.precio}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardCarrito;
