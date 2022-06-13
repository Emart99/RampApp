import * as React from "react";
import { Card, Paragraph, Avatar } from "react-native-paper";
import { Pressable, View } from "react-native";

import newCardStyles from "../../styles/newCardStyles";
import AdminRampa from "../modales/AdminRampa";

const CardRampa = (rampa, theme) => {
  const [visibleModalAdmin, setVisibleModalAdmin] = React.useState(false);

  const touchHandler = () => {
    setVisibleModalAdmin(true);
  };

  return (
    <> 
    {/* error de key zzz */}
      <Pressable key={rampa.id} onPress={touchHandler}>
        <Card
          style={[
            newCardStyles.card,
            { backgroundColor: theme.colors.headerPerfil },
          ]}
          elevation={10}
        >
          <Card.Title
            style={{ marginTop: 10 }}
            title={`${rampa.calle} ${rampa.altura}`}
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="map-marker"
                color={theme.colors.text}
              />
            )}
            titleNumberOfLines={2}
          />
          <Card.Cover
            style={newCardStyles.img}
            source={require("../../utils/casaBrunillo.png")}
          />
          <Card.Content style={newCardStyles.container}>
            <View style={newCardStyles.innerContainer}>
              <Avatar.Icon
                size={40}
                icon="access-point"
                color={theme.colors.text}
                style={{ marginLeft: 5, marginRight: 5 }}
              />
              <Paragraph style={newCardStyles.font}>
                Estado: {rampa.estado}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </Pressable>
      {AdminRampa(rampa.id, visibleModalAdmin, setVisibleModalAdmin)}
    </>
  );
};

export default CardRampa;
