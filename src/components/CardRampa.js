import * as React from 'react';
import {
  Card,
  Paragraph,
  Avatar
} from 'react-native-paper';
import {Pressable, View} from 'react-native';
import newCardStyles from '../styles/newCardStyles';

const CardRampa = (rampa, theme) => {

    const touchHandler = () => {
        console.log(rampa.id, rampa.calle + ' ' + rampa.altura);
      };

  return (
    <Pressable onPress={touchHandler}>
    <Card
      style={[newCardStyles.card, {backgroundColor: theme.colors.headerPerfil}]}
      elevation={10}>
      <Card.Title
        style={{marginTop: 10}}
        title={`${rampa.calle} ${rampa.altura}`}
        left={props => (
          <Avatar.Icon {...props} icon="map-marker" color={theme.colors.text} />
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
            icon="account-badge-horizontal-outline"
            color={theme.colors.text}
            style={{marginLeft: 5, marginRight: 5}}
          />
          <Paragraph style={newCardStyles.font}>Estado: {rampa.estado}</Paragraph>
          {/* <Paragraph style={[newCardStyles.font, {marginLeft: 10}]}>
            Hasta: {reserva.hasta}
          </Paragraph> */}
        </View>
        {/* <View style={newCardStyles.innerContainer}>
          <Avatar.Icon size={50} icon="cash" color={theme.colors.text} />
          <Paragraph style={newCardStyles.font}>
            Precio: ${reserva.precio}
          </Paragraph>
        </View> */}
      </Card.Content>
    </Card>
   </Pressable>
  );
};

export default CardRampa;