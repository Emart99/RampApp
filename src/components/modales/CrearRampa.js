import React from "react";
import { Text, IconButton, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";

import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import { geocoder } from "../../api/http";

const CrearRampa = (visible, setVisible) => {
  const theme = useTheme();

  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Modal
        dismissable={false}
        contentContainerStyle={[
          { backgroundColor: theme.colors.modal },
          modalStyles.modal,
        ]}
        animationType="fade"
        visible={visible}
      >
        <View style={modalStyles.inputContainer}>
          <Text style={modalStyles.titulo}>Agregar Rampa</Text>
          {GlobalInput(
            "Calle",
            "",
            "setCalle",
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Altura",
            "",
            "setAltura",
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Partido",
            "",
            "setPartido",
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Localidad",
            "",
            "setLocalidad",
            styles.inputView,
            false,
            "default"
          )}
          {GlobalInput(
            "Código Postal",
            "",
            "setCodigoPostal",
            styles.inputView,
            false,
            "default"
          )}
          </View>
          <View style={modalStyles.imgInputsContainer}>
          {/* <Text style={{fontSize:20, alignSelf:'center'}}>Fotos </Text> */}
          <View style={[modalStyles.imgContainer,]}>
            <Text style={modalStyles.textStyle}>Foto Rampa</Text>
            <Text style={modalStyles.textStyle}>Foto  DNI</Text>
            <Text style={modalStyles.textStyle}>Foto Escritura</Text>
          </View>
          <View style={modalStyles.imgContainer}>
            <View style={modalStyles.ctn}>
            <IconButton
              icon="image-plus"
              color={theme.colors.text}
              onPress={() => console.log("zz")}
              style={{ margin: 0, padding: 0 }}
              size={27}
            />
            <IconButton
              icon="camera"
              color={theme.colors.text}
              onPress={() => console.log("zz")}
              style={{ margin: 0, padding: 0 }}
              size={28}
            />
            </View >
            <View style={modalStyles.ctn}>
            <IconButton
              icon="image-plus"
              color={theme.colors.text}
              onPress={() => console.log("zz")}
              style={{ margin: 0, padding: 0 }}
              size={27}
            />
            <IconButton
              icon="camera"
              color={theme.colors.text}
              onPress={() => console.log("zz")}
              style={{ margin: 0, padding: 0 }}
              size={28}
            />
            </View>
            <View style={modalStyles.ctn}>
            <IconButton
              icon="image-plus"
              color={theme.colors.text}
              onPress={() => console.log("zz")}
              style={{ margin: 0, padding: 0 }}
              size={27}
            />
            <IconButton
              icon="camera"
              color={theme.colors.text}
              onPress={() =>
                geocoder(jsonFalopa).then((data) => console.log(data))
              }
              style={{ margin: 0, padding: 0 }}
              size={28}
            />
            </View>
          </View>
        </View>

        <View style={modalStyles.buttonContainer}>
          {GlobalButton(
           [{borderColor:theme.colors.secondary,borderStyle:'solid',borderWidth:1},modalStyles.button],
            { color: theme.colors.text,textAlign:'center'  },
            "Cancelar",
            hideModal
          )}
          {GlobalButton([{backgroundColor:theme.colors.secondary},modalStyles.button], { color: theme.colors.secondaryText,textAlign:'center' }, "Agregar", hideModal)}
        </View>
      </Modal>
    </Portal>
  );
};

export default CrearRampa;
const jsonFalopa = {
  altura: 3964,
  calle: "Jose Hernandez",
  localidad: "",
  ciudad: "Villa Ballester",
  partido: "San Martin",
  codigopostal: 1653,
};
