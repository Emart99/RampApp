import React, { useCallback } from "react";
import { ScrollView } from "react-native";
import { Snackbar, useTheme, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import cardStyles from "./../styles/cardStyles";
import reservaStyles from "../styles/reservaStyles";
import CardReserva from "../components/cards/CardReserva";
import styles from "../styles/styles";
import { traerReservasDelUsuario } from "../api/http";

const AdministrarReservas = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [showAlertDenuncia, setShowAlertDenuncia] = React.useState(false);
  const [visibleToast, setVisibleToast] = React.useState(false);
  const [reservas, setReservas] = React.useState([]);
  const [dominioDenunciado, setDominioDenunciado] = React.useState("");
  const [enviandoDenuncia, setEnviandoDenuncia] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchReservas = async () => {
        const reser = await traerReservasDelUsuario();
        setReservas(reser);
      };
      fetchReservas();
    }, [])
  );
  const onDismissSnackBar = () => setVisibleToast(false);

  return (
    <>
      <Text
        style={[
          { color: theme.colors.text, paddingTop: insets.top },
          reservaStyles.titulo,
        ]}
      >
        Reservas Activas
      </Text>
      <ScrollView style={cardStyles.scrolleableContainer}>
        {reservas.map((reserva) =>
          CardReserva(
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
          )
        )}
      </ScrollView>
      <Snackbar
        visible={visibleToast}
        onDismiss={onDismissSnackBar}
        duration={4500}
        style={styles.toastDenuncia}
        wrapperStyle={styles.toastDenunciaWrapper}
      >
        <Text style={{ color: theme.colors.text, fontSize: 17 }}>
          Denuncia realizada con éxito
        </Text>
      </Snackbar>
    </>
  );
};
export default AdministrarReservas;
