import React from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

import cardStyles from "./../styles/cardStyles";
import CardRampa from "../components/cards/CardRampa";
import CrearRampa from "../components/modales/CrearRampa";

const AdministrarRampa = () => {
  // const [rampas, setRampas] = React.useState([]);
  const theme = useTheme();
  const [visibleModalCrear, setVisibleModalCrear] = React.useState(false);


  const showModalCrear = () => setVisibleModalCrear(true);


  // useEffect(() => {
  //   traerRampas().then(response => {
  //     setRampas(response);
  //   });
  // }, []);

  return (
    <>
      <Text style={[{ color: theme.colors.text }, cardStyles.titulo]}>
        Rampas
      </Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {rampas.map((rampa) => CardRampa(rampa, theme))}
      </ScrollView>
      <TouchableOpacity
        style={[
          { backgroundColor: theme.colors.secondary },
          cardStyles.agregarButton,
        ]}
        onPress={showModalCrear}
      >
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.secondaryText,
            padding: 5,
          }}
        >
          AGREGAR
        </Text>
      </TouchableOpacity>

      {CrearRampa(visibleModalCrear, setVisibleModalCrear)}

    </>
  );
};
export default AdministrarRampa;

const rampas = [
  {
    id: 0,
    calle: "Av zzz",
    altura: "012345678901234567890123456789012345678",
    estado: "Disponible",
  },
  {
    id: 1,
    calle: "Av zzz",
    altura: "0345678",
    estado: "No disponible",
  },
  {
    id: 2,
    calle: "Av zzz",
    altura: "0123",
    estado: "Disponible",
  },
  {
    id: 3,
    calle: "Av zzz",
    altura: "01234567890128",
    estado: "Disponible",
  },
  {
    id: 4,
    calle: "Av zzz",
    altura: "012",
    estado: "No disponible",
  },
];
