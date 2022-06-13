import React from "react";
import { Text, IconButton, useTheme, Portal, Modal } from "react-native-paper";
import { View } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import GlobalInput from "../GlobalInput";
import GlobalButton from "../GlobalButton";
import styles from "../../styles/styles";
import modalStyles from "../../styles/modalStyles";
import { geocoder } from "../../api/http";

const CrearRampa = (visible, setVisible) => {
  const theme = useTheme();
  const [showAlertDatosCorrectos,setShowAlertDatosCorrectos] = React.useState(false);
  const [showAlertDatosInvalidos,setShowAlertDatosInvalidos] = React.useState(false);
  const hideModal = () => {
    setVisible(false)
  }
  const hideModalCorrecta = () =>{
    hideModal()
    setShowAlertDatosCorrectos(true);
  }

  return (
    <Portal>
      <AwesomeAlert
          titleStyle={{width:"100%",color:theme.colors.text}}
          contentContainerStyle={{backgroundColor:theme.colors.background}}
          show={showAlertDatosCorrectos}
          showProgress={false}
          title="Registrada correctamente!"
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#00DB6F"
          closeOnTouchOutside={false}
          onConfirmPressed={() => {
            setShowAlertDatosCorrectos(false)
            hideModal()
          }}
        />
        {/* ALERT DE REGISTRADO INCORRECTO */}
        <AwesomeAlert
          titleStyle={{width:"100%",color:theme.colors.text}}
          contentContainerStyle={{backgroundColor:theme.colors.background}}
          show={showAlertDatosInvalidos}
          showProgress={false}
          title="Error, la rampa ya estaba registrada!"
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Volver a registrarse"
          confirmButtonColor="#DD6B55"
          closeOnTouchOutside={false}
          onConfirmPressed={() => {
            setShowAlertDatosInvalidos(false)
          }}
        />
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
          <View style={[modalStyles.imgContainer]}>
            <Text style={modalStyles.textStyle}>Foto Rampa</Text>
            <Text style={modalStyles.textStyle}>Foto DNI</Text>
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
            [{ borderColor: theme.colors.secondary }, modalStyles.button],
            { color: theme.colors.text, textAlign: "center" },
            "Cancelar",
            hideModal
          )}
          {GlobalButton(
            [
              {
                backgroundColor: theme.colors.secondary,
                borderColor: theme.colors.secondary,
              },
              modalStyles.button,
            ],
            { color: theme.colors.secondaryText, textAlign: "center" },
            "Agregar",
            hideModalCorrecta
          )}
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
