import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
//axios.defaults.baseURL = "http://localhost:9000";
const IP_DEV = "192.168.56.1"
const ENV_DEV_URL = 'http://' + IP_DEV + ':9000'
const ENV_IMGUR_CLIENT_ID = "bd34bd7d458c396"

export const setUsuarioId = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}
export const getUsuarioId = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
        return value
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}
export const cerrarSesion = async () =>{
    try{
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.removeItem('@storage_Key', jsonValue)
    }
    catch(e){

    }
}


// export async function traerVehiculos(){
//     let response = await axios.get("/vehiculos");
//     return response.data;
// }

export async function traerRampas() {
    let response = await axios.get(ENV_DEV_URL + "/rampasDisponibles");
    return response.data;
}

export async function traerUsuario() {
    const response = await axios.get(ENV_DEV_URL + '/usuario/'+ await getUsuarioId())
    return response.data
}

export async function registrar(datosRegistro) {
    const response = await axios.put(ENV_DEV_URL + '/usuario/registrar', datosRegistro)
    return response.data
}

export async function logear(_usuario) {
    const response = await axios.post(ENV_DEV_URL + '/usuario/login', _usuario)
    return response.data
}

export async function geocoder(datosDireccion) {
    const response = await axios.get("https://nominatim.openstreetmap.org/search?" + `q=${datosDireccion.altura}%2C+${datosDireccion.calle}%2C+Partido de ${datosDireccion.partido}%2C+Buenos+Aires%2C+B${datosDireccion.codigopostal}%2C+Argentina+&format=json`)
    return response.data
}

export async function subirImagen (base64img){
    const response = await axios.post("https://api.imgur.com/3/upload",{
        type:"base64",
        image:base64img
    },
    {headers:{"Authorization" : "Client-ID "+ENV_IMGUR_CLIENT_ID}}
    )
    return response.data
}


export async function creacionDeRampa (rampaJSON){
    const response = await axios.put(ENV_DEV_URL + "/agregarRampa/"+ await getUsuarioId(), rampaJSON)
    return response.data
}

export async function crearVehiculo (vehiculoJSON){
    const response = await axios.put(ENV_DEV_URL + "/agregarVehiculo/"+ await getUsuarioId() , vehiculoJSON)
    return response.data
}

export async function traerVehiculo() {
    const response = await axios.get(ENV_DEV_URL + '/vehiculo/7')
    return response.data
}

export async function modificarVehiculo(idVehiculo,marca,modelo,dominio) {
    const vehiculoJSON = {
        marca:marca,
        modelo:modelo,
        dominio:dominio
    }
    const response = await axios.put(ENV_DEV_URL + "/modificarVehiculo/"+idVehiculo,vehiculoJSON)
    return response.data
}

export async function borrarVehiculo(vehiculo){
    const response = await axios.delete(ENV_DEV_URL + "/eliminarVehiculo/"+ await getUsuarioId()+"/"+vehiculo.id)
    return response.data
}

export async function traerVehiculosDelUsuario(){
    let response = await axios.get(ENV_DEV_URL + "/usuario/vehiculosPropios/"+ await getUsuarioId());
    return response.data;
}

export async function traerRampasDelUsuario(){
    let response = await axios.get(ENV_DEV_URL + "/usuario/rampasPropias/"+ await getUsuarioId());
    return response.data;
}

export async function traerReservasDelUsuario(){
    let response = await axios.get(ENV_DEV_URL + "/usuario/reservasActivas/"+ await getUsuarioId());
    return response.data;
}

export async function modificarRampa(rampa,horaDesde,horaHasta,isSwitchOn){
    // const rampaJSON = {
    //     id:rampa.id,
    //     posx:rampa.posx,
    //     posy:rampa.posy,
    //     calle:rampa.calle,
    //     altura:rampa.altura,
    //     imagenRampa:rampa.imagenRampa,
    //     imagenDni:rampa.imagenDni,
    //     imagenEscritura:rampa.imagenEscritura,
    //     nroPartidaInmobiliaria:rampa.nroPartidaInmobiliaria,
    //     estadoRampa:isSwitchOn? "Disponible":"Ocupada",
    //     horariosDisponibles:[{horarioDesde: newDate.setHours(1),horarioHasta: newDate.setHours(2)}],
    //     reservasRealizadas:rampa.reservasRealizadas
    // }
    // const response = await axios.put(ENV_DEV_URL+"/modificarHorarioRampa/"+rampa.id, rampaJSON)
    // return response.data
}