import React,{useEffect} from "react";
import {  ScrollView } from "react-native";
import { Snackbar, useTheme,Text } from "react-native-paper";

import cardStyles from "./../styles/cardStyles";
import reservaStyles from "../styles/reservaStyles";
import CardReserva from "../components/cards/CardReserva";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../styles/styles";
import { traerReservasDelUsuario } from "../api/http";

const AdministrarReservas = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [showAlertDenuncia, setShowAlertDenuncia] = React.useState(false);
  const [visibleToast, setVisibleToast] = React.useState(false);
  const [reservas,setReservas] = React.useState([])

  useEffect(()=>{
    const fetchReservas = async () =>{
      const reser = await traerReservasDelUsuario()
      setReservas(reser)
    }
  },[])
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
            setVisibleToast
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


