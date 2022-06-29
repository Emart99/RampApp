import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
//axios.defaults.baseURL = "http://localhost:9000";
const IP_DEV = "192.168.1.16"
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
    const response = await axios.get("https://nominatim.openstreetmap.org/search?" + `q=${datosDireccion.altura}%2C+${datosDireccion.calle}%2C+${datosDireccion.localidad}%2C+Partido de ${datosDireccion.partido}%2C+Buenos+Aires%2C+B${datosDireccion.codigopostal}%2C+Argentina+&format=json`)
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

export async function denunciarInfractor(motivo, imagen, dominio, direccion){
    const denuncia = {
        motivoDenuncia: motivo,
        dominio: dominio,
        direccionRampa: direccion,
        imagen: imagen
    }
    const response = await axios.put(ENV_DEV_URL + "/realizarDenuncia/"+ await getUsuarioId(),denuncia)
    return response.data
}

export async function rampaById(id){
    const response = await axios.get(ENV_DEV_URL + "/rampaDisponible/"+id)
    return response.data
}

export async function reservarRampa(reservas, idRampa,dominio){
    const response = await axios.put(ENV_DEV_URL + `/reservarRampa/${idRampa}/`+ await getUsuarioId()+"/"+dominio,reservas)
    return response.data
}

export async function traeCarrito(){
    const response = await axios.get(ENV_DEV_URL + "/usuario/carrito/"+ await getUsuarioId())
    return response.data
}

export async function pagarCarrito(){
    const response = await axios.post(ENV_DEV_URL + "/usuario/carrito/"+ await getUsuarioId()+"/pagar")
    return response.data
}

export async function borrarDelCarrito(idReserva){
    const response = await axios.delete(ENV_DEV_URL + "/usuario/carrito/"+ await getUsuarioId()+"/borrar/"+idReserva)
    return response.data
}

export async function deshabilitarRampa(idRampa){
    const response = await axios.delete(ENV_DEV_URL + "/eliminarHorarioRampa/"+idRampa)
    return response.data
}

export async function habilitarRampa(idRampa,horarios){
    const response = await axios.put(ENV_DEV_URL + "/agregarHorarioRampa/"+idRampa,horarios)
    return response.data
}

export async function verificarPropiedadRampa(rampaJSON){
    const response = await axios.put(ENV_DEV_URL + "/verificarPropiedadRampa/"+ await getUsuarioId(), rampaJSON)
    return response.data
}