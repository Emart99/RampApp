import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme, Surface } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import GlobalButton from './GlobalButton';
import styles from '../styles/styles';
import { ScrollView } from 'react-native';


const imgStyle = StyleSheet.create({
    imgRampa: {
        margin: 'auto',
        width: '87%',
        height: '24.5%',
        borderRadius: 3,
        resizeMode: "cover",
    }
})

const RampasDisponibles = () => {
    const theme = useTheme()
    return (
        

        <View style={{ display: "flex", alignItems: "center", height: '100%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: theme.colors.text, margin: 10 }}>
                AV. JORGE EGGER 223
            </Text>
            <Text style={{ fontSize: 20, color: theme.colors.text, marginBottom: 10 }}>
                Vicente Lopez
            </Text>
            <Image
                style={imgStyle.imgRampa}
                source={require('../utils/casaBrunillo.png')}
            />
            <View style={{ alignSelf: 'flex-start', marginTop: '6%', marginBottom: '2%', marginLeft: '6.5%' }}>
                <Text style={{ fontSize: 17, color: theme.colors.text }} >Horarios de reserva</Text>
            </View>
          
                <FlatGrid
                    style={{ width: '93%' }}
                    spacing={12}
                    itemDimension={75}
                    data={["24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00", "24:00", "23:00"]}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ elevation: 5, shadowColor: 'black', backgroundColor: theme.colors.headerPerfil, padding: 8, borderRadius: 5 }}>
                            <Text style={{ fontSize: 19, color: theme.colors.text, textAlign: 'center' }}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:'40.2%',fontSize:20}} >$4000</Text>
                {GlobalButton([styles.loginButton, { marginTop:-10,backgroundColor: theme.colors.secondary,width:"33%",height:40 }], { color: theme.colors.secondaryText }, "RESERVAR", {})}
                </View>



        </View>
    )
}

export default RampasDisponibles;
