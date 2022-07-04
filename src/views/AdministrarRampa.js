import React, { useEffect, useMemo } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Snackbar, useTheme, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useSetState from "../utils/useSetState";
import cardStyles from "./../styles/cardStyles";
import CardRampa from "../components/cards/CardRampa";
import CrearRampa from "../components/modales/CrearRampa";
import { traerRampasDelUsuario } from "../api/http";
import styles from "../styles/styles";

const AdministrarRampa = () => {
  const [rampas, setRampas] = React.useState([]);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [crearState, setCrearState] = useSetState({
    visibleModalCrear:false,
    showAlertDatosCorrectos:false,
    showAlertDatosInvalidos:false,
    visibleLoading:false,
    camaraDisbabled:false,
    showAlertRampaRegistrada:false,
    jsonRampaRegistrada:{}
  });
  const [adminState, setAdminState] = useSetState({
    visibleModalAdmin: false,
    showAlertDenuncia: false,
    onPressRefresh: false,
    isSwitchOn: true,
    visibleTimePickerDesde: false,
    visibleTimePickerHasta: false,
    horarios: [],
    visibleToast: false,
    dominioDenunciado: "",
    enviandoDenuncia: false,
  });

  const showModalCrear = () => setCrearState({ visibleModalCrear: true });

  const limitTime = useMemo(() => {
    return adminState.horarios.length > 5;
  }, [adminState.horarios]);

  useEffect(() => {
    async function fetchRampas() {
      const ramp = await traerRampasDelUsuario();
      if (ramp != undefined) {
        setRampas(ramp);
      }
    }
    fetchRampas();
  }, [adminState.onPressRefresh]);

  const onDismissSnackBar = () => setAdminState({ visibleToast: false });

  return (
    <>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {rampas.map((rampa) => (
          <CardRampa
            key={rampa.id}
            rampa={rampa}
            theme={theme}
            state={adminState}
            setState={setAdminState}
            limitTime={limitTime}
          ></CardRampa>
        ))}
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
        visible={adminState.visibleToast}
        onDismiss={onDismissSnackBar}
        duration={2500}
        style={styles.toastDenuncia}
        wrapperStyle={styles.toastDenunciaWrapper}
      >
        <Text style={{ color: theme.colors.text, fontSize: 17 }}>
          Denuncia realizada con éxito
        </Text>
      </Snackbar>
      <CrearRampa theme={theme} state={crearState} setState={setCrearState}/>
    </>
  );
};
export default AdministrarRampa;
