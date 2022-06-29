import React, { useEffect, useMemo } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Snackbar, useTheme, Text } from "react-native-paper";

import cardStyles from "./../styles/cardStyles";
import CardRampa from "../components/cards/CardRampa";
import CrearRampa from "../components/modales/CrearRampa";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { traerRampasDelUsuario } from "../api/http";
import styles from "../styles/styles";

const AdministrarRampa = () => {
  const [rampas, setRampas] = React.useState([]);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [visibleModalCrear, setVisibleModalCrear] = React.useState(false);
  const [visibleModalAdmin, setVisibleModalAdmin] = React.useState(false);
  const [showAlertDatosCorrectos, setShowAlertDatosCorrectos] =
    React.useState(false);
  const [showAlertDatosInvalidos, setShowAlertDatosInvalidos] =
    React.useState(false);
  const [showAlertDenuncia, setShowAlertDenuncia] = React.useState(false);
  const [onPressRefresh, setOnPressRefresh] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const [visibleTimePicker, setVisibleTimePicker] = React.useState({
    desde: false,
    hasta: false,
  });
  const [horarios, setHorarios] = React.useState([]);
  const [horario, setHorario] = React.useState({ horarioDesde: 0, horarioHasta: 0 });
  const [visibleLoading, setVisibleLoading] = React.useState(false);
  const [visibleToast, setVisibleToast] = React.useState(false);
  const [camaraDisbabled, setCamaraDisbabled] = React.useState(false);
  const [dominioDenunciado, setDominioDenunciado] = React.useState("");
  const [enviandoDenuncia, setEnviandoDenuncia] = React.useState(false);
  const [showAlertRampaRegistrada, setShowAlertRampaRegistrada] =
    React.useState(false);
  const [jsonRampaRegistrada, setJsonRampaRegistrada] = React.useState({});

  const showModalCrear = () => setVisibleModalCrear(true);

  const agregarDisabled = useMemo(() => {
    if (horario.horarioHasta > 0 && horario.horarioDesde > 0) {
      return false;
    }
    return true;
  }, [horario]);

  const limitTime = useMemo(() => {
    return horarios.length > 5;
  }, [horarios]);

  useEffect(() => {
    async function fetchRampas() {
      const ramp = await traerRampasDelUsuario();
      if (ramp != undefined) {
        setRampas(ramp);
      }
    }
    fetchRampas();
  }, [onPressRefresh]);

  const onDismissSnackBar = () => setVisibleToast(false);

  return (
    <>
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
            visibleTimePicker,
            setVisibleTimePicker,
            horarios,
            setHorarios,
            horario,
            setHorario,
            showAlertDenuncia,
            setShowAlertDenuncia,
            visibleToast,
            setVisibleToast,
            dominioDenunciado,
            setDominioDenunciado,
            enviandoDenuncia,
            setEnviandoDenuncia,
            agregarDisabled,
            limitTime
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
      <Snackbar
        visible={visibleToast}
        onDismiss={onDismissSnackBar}
        duration={2500}
        style={styles.toastDenuncia}
        wrapperStyle={styles.toastDenunciaWrapper}
      >
        <Text style={{ color: theme.colors.text, fontSize: 17 }}>
          Denuncia realizada con éxito
        </Text>
      </Snackbar>
      {CrearRampa(
        visibleModalCrear,
        setVisibleModalCrear,
        theme,
        showAlertDatosCorrectos,
        setShowAlertDatosCorrectos,
        showAlertDatosInvalidos,
        setShowAlertDatosInvalidos,
        visibleLoading,
        setVisibleLoading,
        camaraDisbabled,
        setCamaraDisbabled,
        showAlertRampaRegistrada,
        setShowAlertRampaRegistrada,
        jsonRampaRegistrada,
        setJsonRampaRegistrada
      )}
    </>
  );
};
export default AdministrarRampa;
