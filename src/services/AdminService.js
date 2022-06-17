
import axios from 'axios'
import { Administrador } from '../Dominio/Administrador'
import { Denuncia } from '../Dominio/Denuncia'
import { RampaPendienteAprobacion } from '../Dominio/RampasPendienteDeAprobacion'
import { REST_SERVER_URL } from './constants'


class AdminService {
    adminLogueado


    async getBuscarUsuario(login) {
        const user = await axios.post(`${REST_SERVER_URL}/administrador/login`,login)
        this.adminLogueado = Administrador.FromJson(user.data)
      }

      async traerRampasAHabilitar() {
        const rampasJson = await axios.get(`${REST_SERVER_URL}/administrador/rampasPendientesAprobacion`)
        return rampasJson.data.map((rampa) => RampaPendienteAprobacion.FromJson(rampa))  
      }

      async traerDenunciasAHabilitar(){
        const denunciaJson = await axios.get(`${REST_SERVER_URL}/administrador/denunciasPendientesAprobacion`)
        return denunciaJson.data.map((denuncia) => Denuncia.FromJson(denuncia))  
      }
}

export const adminService = new AdminService()