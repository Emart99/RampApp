import React from "react";
import {
  Button,
  Dialog,
  Portal,
  Paragraph,
  TextInput,
  useTheme,
} from "react-native-paper";
import { View } from "react-native";

import styles from "../styles/styles";

const OlvidoSuContrasenia = (props, setProps) => {
  const theme = useTheme();
  const hideDialog = () => setProps(false);
  const [text, setText] = React.useState("");

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: theme.colors.modal,marginTop:15,marginBottom:10 }}
        visible={props}
        onDismiss={hideDialog}
      >
        <Dialog.Content>
          <Paragraph style={styles.loginText}>
            Introducir el email correspondiente a la cuenta que quiere
            recuperar.
          </Paragraph>
        </Dialog.Content>
        <View style={styles.olvidoSuContraseniaModalView}>
          <TextInput
            mode="outlined"
            theme={{colors:{placeholder:theme.colors.text,background:theme.colors.input}}}
            label="Email"
            onChangeText={(text) => setText(text)}
          />
        </View>
        <Dialog.Actions>
          <Button color={theme.colors.text} onPress={() => hideDialog()}>
            Cancel
          </Button>
          <Button color={theme.colors.text} onPress={() => hideDialog()}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default OlvidoSuContrasenia;
