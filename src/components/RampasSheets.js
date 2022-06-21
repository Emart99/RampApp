import React, { useState, useEffect } from "react";
import ActionSheet from "react-native-actions-sheet";
import { View, Text, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import _ from "lodash";
import { useWindowDimensions, ToastAndroid } from "react-native";
import { Snackbar } from "react-native-paper";
import GlobalButton from "./GlobalButton";
import styles from "../styles/styles";
import {
  rampaById,
  reservarRampa,
  traerVehiculosDelUsuario,
} from "../api/http";

const imgStyle = StyleSheet.create({
  imgRampa: {
    margin: "auto",
    width: "87%",
    height: "22.5%",
    borderRadius: 3,
    resizeMode: "cover",
  },
});

const IMPORTE_BASE = 200;

function procesoDeListas(objetosMultiples) {
  let lista = [];
  objetosMultiples.map((objeto) => {
    lista.push(_.range(objeto.horarioDesde, objeto.horarioHasta + 1));
  });
  return lista;
}

const RampasSheets = (theme, actionSheetRef, setIsOpen) => {
  const { height, width } = useWindowDimensions();
  const [horariosIzquierda, setHorariosIzquierda] = useState([]);
  const [horariosDerecha, setHorariosDerecha] = useState([]);
  const [rampa, setRampa] = useState();
  const [visibleToast, setVisibleToast] = useState(false);
  const [messageFeedback, setMessageFeedback] = useState("");
  const [autos, setAutos] = useState();
  const [dominio, setDominio] = useState();

  const calculoDePrecio = () => {
    let precio = 0;
    for (let i = 0; i < horariosIzquierda.length; i++) {
      precio += IMPORTE_BASE * (horariosDerecha[i] - horariosIzquierda[i]);
    }
    if (isNaN(precio)) {
      return 0;
    }
    return precio;
  };

  const reservar = async () => {
    let reservas = [];
    for (let i = 0; i < horariosIzquierda.length; i++) {
      const reserva = {
        horaInicioReserva: horariosIzquierda[i],
        horaFinReserva: horariosDerecha[i],
        importePagado:
          IMPORTE_BASE * (horariosDerecha[i] - horariosIzquierda[i]),
      };

      reservas.push(reserva);
    }
    reservarRampa(reservas, rampa.id, dominio)
      .then(() => {
        setMessageFeedback("La reserva se ha realizado correctamente");
        setVisibleToast(true);
      })
      .catch((error) => {
        setMessageFeedback("Error, revise los datos introducidos");
        setVisibleToast(true);
      });
  };

  const Toast = (visible, message) => {
    if (visible) {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      return null;
    }
    return null;
  };
  useEffect(() => setVisibleToast(false), [visibleToast]);

  return (
    <ActionSheet
      ExtraOverlayComponent={Toast(visibleToast, messageFeedback)}
      onClose={() => {
        setIsOpen(false);
        setVisibleToast(false);
      }}
      onBeforeShow={(data) => {
        const fetchAutosUsuario = async () => {
          const autitos = await traerVehiculosDelUsuario();
          setAutos(autitos);
        };
        const fetchRampa = async () => {
          const ramp = await rampaById(data.value);
          setRampa(ramp);
        };
        setIsOpen(true);
        fetchRampa();
        fetchAutosUsuario();
        setVisibleToast(false);
      }}
      initialOffsetFromBottom={0.35}
      id="rampas_bottom_sheet"
      ref={actionSheetRef}
      statusBarTranslucent
      bounceOnOpen={true}
      drawUnderStatusBar={true}
      bounciness={8}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      containerStyle={{ backgroundColor: theme.colors.background }}
      indicatorColor={theme.colors.secondary}
    >
      <View style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: theme.colors.text,
            margin: 10,
          }}
        >
          {rampa && rampa.calle + " " + rampa.altura}
        </Text>
        <Image
          style={imgStyle.imgRampa}
          source={{ uri: rampa && rampa.imagenRampa }}
        />

        <Text
          style={{
            fontSize: 20,
            color: theme.colors.text,
            alignSelf: "flex-start",
            marginTop: "6%",
            marginBottom: "10%",
            marginLeft: "6.5%",
          }}
        >
          Horarios de reserva
        </Text>

        <View style={{ height: "37%" }}>
          <View
            style={{ display: "flex", flexDirection: "row", width: "100%" }}
          >
            <View
              style={{
                width: "50%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginLeft: "10%",
                  width: width / 3,
                  fontSize: 18,
                  color: theme.colors.text,
                }}
              >
                Hora Desde
              </Text>
              {rampa &&
                procesoDeListas(rampa.horariosDisponibles).map(
                  (horas, numeroDeDatePicker) => {
                    return (
                      <Picker
                        dropdownIconColor={theme.colors.text}
                        selectedValue={horariosIzquierda[numeroDeDatePicker]}
                        key={Math.random()}
                        onValueChange={(itemValue, itemIndex) => {
                          let lista = [...horariosIzquierda];
                          lista[numeroDeDatePicker] = itemValue;
                          setHorariosIzquierda(lista);
                        }}
                        style={{ width: width / 3 }}
                      >
                        {horas.map((hora) => {
                          return (
                            <Picker.Item
                              style={{
                                color: theme.colors.text,
                                backgroundColor: theme.colors.background,
                              }}
                              key={hora}
                              label={hora.toString() + ":00"}
                              value={hora}
                            />
                          );
                        })}
                      </Picker>
                    );
                  }
                )}
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginLeft: "10%",
                  width: width / 3,
                  fontSize: 18,
                  color: theme.colors.text,
                }}
              >
                Hora Hasta
              </Text>
              {rampa &&
                procesoDeListas(rampa.horariosDisponibles).map(
                  (horas, numeroDeDatePicker) => {
                    return (
                      <Picker
                        dropdownIconColor={theme.colors.text}
                        selectedValue={horariosDerecha[numeroDeDatePicker]}
                        key={Math.random()}
                        onValueChange={(itemValue, itemIndex) => {
                          let lista = [...horariosDerecha];
                          lista[numeroDeDatePicker] = itemValue;
                          setHorariosDerecha(lista);
                        }}
                        style={{ width: width / 3 }}
                      >
                        {horas.map((hora) => {
                          return (
                            <Picker.Item
                              style={{
                                color: theme.colors.text,
                                backgroundColor: theme.colors.background,
                              }}
                              key={hora}
                              label={hora.toString() + ":00"}
                              value={hora}
                            />
                          );
                        })}
                      </Picker>
                    );
                  }
                )}
            </View>
          </View>
        </View>
        {autos && autos.length == 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, color: theme.colors.text }}>
              Primero debe registrar su vehículo
            </Text>
          </View>
        )}
        {autos && autos.length != 0 && (
          <View>
            <Picker
              style={{ width: width / 1.5, alignSelf: "center" }}
              selectedValue={dominio}
              onValueChange={(value) => {
                setDominio(value);
              }}
              dropdownIconColor={theme.colors.text}
              key={Math.random()}
            >
              <Picker.Item
                style={{
                  color: theme.colors.text,
                  backgroundColor: theme.colors.background,
                }}
                key={Math.random()}
                label={"Seleccione el dominio..."}
                value={undefined}
              />
              {autos &&
                autos.map((auto) => {
                  return (
                    <Picker.Item
                      style={{
                        color: theme.colors.text,
                        backgroundColor: theme.colors.background,
                      }}
                      key={auto.id}
                      label={auto.dominio.toString()}
                      value={auto.dominio}
                    />
                  );
                })}
            </Picker>
          </View>
        )}
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: theme.colors.text }}>
            ${calculoDePrecio()}
          </Text>
          {GlobalButton(
            [
              styles.loginButton,
              {
                marginTop: -10,
                backgroundColor: theme.colors.secondary,
                width: "33%",
                height: 40,
              },
            ],
            { color: theme.colors.secondaryText },
            "RESERVAR",
            reservar
          )}
        </View>
      </View>
    </ActionSheet>
  );
};

export default RampasSheets;
