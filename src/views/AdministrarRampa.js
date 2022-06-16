import React, { useEffect } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

import cardStyles from "./../styles/cardStyles";
import CardRampa from "../components/cards/CardRampa";
import CrearRampa from "../components/modales/CrearRampa";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { traerRampasDelUsuario } from "../api/http";

const AdministrarRampa = () => {
  const [rampas, setRampas] = React.useState([]);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [visibleModalCrear, setVisibleModalCrear] = React.useState(false);
  const [visibleModalAdmin, setVisibleModalAdmin] = React.useState(false);
  const [showAlertDatosCorrectos, setShowAlertDatosCorrectos] = React.useState(false);
  const [showAlertDatosInvalidos, setShowAlertDatosInvalidos] = React.useState(false);
  const [onPressRefresh, setOnPressRefresh] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const [horaDesde, setHoraDesde] = React.useState(0);
  const [horaHasta, setHoraHasta] = React.useState(0);
  const [visibleTimePickerD, setVisibleTimePickerD] = React.useState(false);
  const [visibleTimePickerH, setVisibleTimePickerH] = React.useState(false);

  const showModalCrear = () => setVisibleModalCrear(true);

  useEffect(() => {
    async function fetchRampas() {
      const ramp = await traerRampasDelUsuario();
      if (ramp != undefined) {
        setRampas(ramp);
      }
    }
    fetchRampas();
  }, [onPressRefresh]);

  return (
    <>
      <Text
        style={[
          { color: theme.colors.text, paddingTop: insets.top },
          cardStyles.titulo,
        ]}
      >
        Rampas
      </Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {rampas.map((rampa) =>
          CardRampa(
            rampa,
            theme,
            visibleModalAdmin,
            setVisibleModalAdmin,
            onPressRefresh,
            setOnPressRefresh,
            isSwitchOn,
            setIsSwitchOn,
            horaDesde,
            setHoraDesde,
            horaHasta,
            setHoraHasta,
            visibleTimePickerD,
            setVisibleTimePickerD,
            visibleTimePickerH,
            setVisibleTimePickerH
          )
        )}
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

      {CrearRampa(
        visibleModalCrear,
        setVisibleModalCrear,
        theme,
        showAlertDatosCorrectos,
        setShowAlertDatosCorrectos,
        showAlertDatosInvalidos,
        setShowAlertDatosInvalidos
      )}
    </>
  );
};
export default AdministrarRampa;
