import React, { useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { View, Text, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import _ from "lodash";
import { useWindowDimensions } from "react-native";

import GlobalButton from "./GlobalButton";
import styles from "../styles/styles";
import { rampaById, reservarRampa } from "../api/http";

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
    reservarRampa(reservas, rampa.id);
  };

  return (
    <ActionSheet
      onClose={() => {
        setIsOpen(false);
      }}
      onBeforeShow={(data) => {
        const fetchRampa = async () => {
          const ramp = await rampaById(data.value);
          setRampa(ramp);
        };
        setIsOpen(true);
        fetchRampa();
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

        <View style={{ height: "44%" }}>
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
                              style={{ color: theme.colors.text }}
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
                              style={{ color: theme.colors.text }}
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

        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={{ fontSize: 20 }}>$4000</Text>
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
