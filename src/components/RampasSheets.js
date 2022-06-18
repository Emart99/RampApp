import React, { useState, useEffect } from "react";
import ActionSheet from "react-native-actions-sheet";
import { View, Text, Image, StyleSheet } from "react-native";
import GlobalButton from "./GlobalButton";
import styles from "../styles/styles";
import { Picker } from "@react-native-picker/picker";
import { rampaById } from "../api/http";
import _ from "lodash";
import { useWindowDimensions } from "react-native";
const imgStyle = StyleSheet.create({
  imgRampa: {
    margin: "auto",
    width: "87%",
    height: "22.5%",
    borderRadius: 3,
    resizeMode: "cover",
  },
});

function procesoDeListas(objetosMultiples) {
  let lista = [];
  objetosMultiples.map((objeto) => {
    lista.push(_.range(objeto.horarioDesde, objeto.horarioHasta + 1));
  });
  return lista;
}


const RampasSheets = (theme, actionSheetRef,setIsOpen) => {
  const { height, width } = useWindowDimensions();
  const [horarios,setHorarios] = useState([])

  const [rampa, setRampa] = useState();
  return (
    <ActionSheet
      onClose={()=>{setIsOpen(false)}}
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
        
          <Text style={{ fontSize: 20, color: theme.colors.text, alignSelf: "flex-start",
            marginTop: "6%",
            marginBottom: "10%",
            marginLeft: "6.5%", }}>
            Horarios de reserva
          </Text>

        
          <View style={{height:"44%"}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent:'space-evenly',
              width:'100%'
            }}
          >
            <Text style={{ width: width / 3, fontSize: 18 }}>Hora Desde</Text>
            <Text style={{ width: width / 3, fontSize: 18 }}>Hora Hasta</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',width:'100%'}}>
          <View
            style={{
              width:'50%',alignItems:'center'
            }}
          >
            {rampa &&
                procesoDeListas(rampa.horariosDisponibles).map((horas,numeroDeDatePicker) => {
                  return (<Picker key={Math.random()} 
                  onValueChange={(itemValue, itemIndex) =>
                    {setHorarios(horarios => horarios[numeroDeDatePicker]=[itemValue,null])
                    console.log(numeroDeDatePicker)
                    console.log(horarios)
                  }
                  }
                
                   style={{ width: width / 3 }}>
                    { 
                    horas.map((hora)=>{
                      return(
                        <Picker.Item
                          key={hora}
                          label={hora.toString() + ":00"}
                          value={hora}
                        />
                      )
                        
                      
                    })
                    }
                  
                  </Picker>)
                })}
            
            </View>
            <View style={{
              width:'50%',alignItems:'center'
            }}>
              {rampa &&
                procesoDeListas(rampa.horariosDisponibles).map((horas,numeroDeDatePicker) => {
                  return (<Picker key={Math.random()}
                   style={{ width: width / 3 }}>
                    {
                    horas.map((hora)=>{
                      return(
                        <Picker.Item
                          key={hora}
                          label={hora.toString() + ":00"}
                          value={hora}
                        />
                      )
                      ;
                    })
                    }
                  
                  </Picker>)
                })}
          
          </View>
          </View>
          </View>

          <View
            style={{
              width:'100%',
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
              {}
            )}
          </View>
        </View>
    </ActionSheet>
  );
};

export default RampasSheets;
