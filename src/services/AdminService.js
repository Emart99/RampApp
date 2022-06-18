
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

     async traerRampa(id){
      const rampa = await axios.get(`${REST_SERVER_URL}/administrador/rampasPendientesAprobacion/${id}`)
      return RampaPendienteAprobacion.FromJson(rampa.data)
    }

    async rechazarRampa(id){
      await axios.get(`${REST_SERVER_URL}/administrador/rechazarRampa/${id}`)
     }

     async aprobarRampa(id){
      await axios.get(`${REST_SERVER_URL}/administrador/habilitarRampa/${id}`)
     }


     async traerDenuncia(id){
      const denuncia = await axios.get(`${REST_SERVER_URL}/administrador/traerDenuncia/${id}`)
      return Denuncia.FromJson(denuncia.data)
    }

    async rechazarDenuncia(id){
     await axios.get(`${REST_SERVER_URL}/administrador/rechazarDenuncia/${id}`)
    }

    
    async aprobarDenuncia(id){
      await axios.get(`${REST_SERVER_URL}/administrador/aprobarDenuncia/${id}`)
     }

}

export const adminService = new AdminService()