import React from 'react';
import { Button, Dialog, Portal, Paragraph, TextInput } from 'react-native-paper';


const OlvidoSuContrasenia = (props, setProps) => {

    const hideDialog = () => setProps(false);
    const [text, setText] = React.useState("");


    return (
        <Portal>
            <Dialog visible={props} onDismiss={hideDialog}>
                <Dialog.Content>
                    <Paragraph>Introducir el email correspondiente a la cuenta que quiere recuperar.</Paragraph>
                </Dialog.Content>
                <TextInput
                    label="Email"
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <Dialog.Actions>
                    <Button onPress={() => hideDialog()}>Cancel</Button>
                    <Button onPress={() => hideDialog()}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );


}

export default OlvidoSuContrasenia;