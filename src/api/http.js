import axios from "axios";
//axios.defaults.baseURL = "http://localhost:9000";
const IP_DEV =""
const ENV_DEV_URL = 'http://'+IP_DEV+':9000'

// export async function traerVehiculos(){
//     let response = await axios.get("/vehiculos");
//     return response.data;
// }

export async function traerRampas(){
    let response = await axios.get(ENV_DEV_URL+"/rampasDisponibles");
    return response.data;
}

export async function traerUsuario(id) {
    const response = await axios.get(ENV_DEV_URL+'/usuario/'+id)
    return response.data
}

export async function registrar(datosRegistro) {
    const response = await axios.put(ENV_DEV_URL+'/usuario/registrar', datosRegistro)

    return response.data
}

export async function logear(userName,contrasenia) {
    const _usuario={
        userName:userName,
        contrasenia:contrasenia
    }
    const response = await axios.post(ENV_DEV_URL+'/usuario/login', _usuario)
    return response.data
}