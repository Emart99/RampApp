import React from 'react';
import { Button, Dialog, Portal, Paragraph,Colors } from 'react-native-paper';
import {TextInput,View} from 'react-native'
import styles from '../styles/styles';


const OlvidoSuContrasenia = (props, setProps) => {

    const hideDialog = () => setProps(false);
    const [text, setText] = React.useState("");


    return (
        <Portal>
            <Dialog style={styles.olvidoSuContraseniaModal} visible={props} onDismiss={hideDialog}>
                <Dialog.Content >
                    <Paragraph style={styles.loginText}>Introducir el email correspondiente a la cuenta que quiere recuperar.</Paragraph>
                </Dialog.Content>
                <View style = {styles.olvidoSuContraseniaModalView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        onChangeText={text => setText(text)}
                    
                    />
                </View>
                <Dialog.Actions >
                    <Button color={Colors.white} onPress={() => hideDialog()}>Cancel</Button>
                    <Button color={Colors.white} onPress={() => hideDialog()}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );


}

export default OlvidoSuContrasenia;