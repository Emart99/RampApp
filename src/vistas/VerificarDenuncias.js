import { ModalRechazo } from './../componentes/ModalRechazo';
import { ModalGenerarCompensacion } from './../componentes/ModalGenerarCompensacion';
import {useEffect, useState} from 'react';
import { adminService } from '../services/AdminService';
import { obtenerMensaje } from "../services/obtenerMensaje";
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'



export const VerificarDenuncias= ({history}) => {
    
    const [denuncia,setDenuncia] = useState('')
    const [errorMessage, SetErrorMessage ] = useState("")
    const {id} = useParams()

    const denunciaAJuzgar = async () => {
        try{
        const canti = await adminService.traerDenuncia(id)
        setDenuncia(canti)}catch (error) {
            const message = obtenerMensaje(error)
            SetErrorMessage(message)
          }
    }

    const rechazarDenuncia = async() =>{
        try{  
          await adminService.rechazarDenuncia(id)
            }
          catch (error) {
              const message = obtenerMensaje(error)
              SetErrorMessage(message)
          }
      }

      const aprobarDenuncia = async() =>{
        try{  
          await adminService.aprobarDenuncia(id)
          }
          catch (error) {
              const message = obtenerMensaje(error)
              SetErrorMessage(message)
          }
      }

    
    
    useEffect(() => {
        denunciaAJuzgar();
      },[]);


    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-5'>Verificar Denuncia</h2>
            <div className='row'>
                <div className='col-md-6'>
                    <img className='imagen-verificar-denuncias' src={denuncia.imagen} alt='...' />
                </div>
                <div className='col-md-6 verificar-denuncia-datos '>
                    <div>Fecha: {denuncia.fecha}</div>
                    <div>Direccion: {denuncia.direccionRampa}</div>
                    <div>Dominio: {denuncia.dominio}</div>
                    <div>Motivo: {denuncia.motivoDenuncia}</div>
                    <div className="d-flex justify-content-around">
                        <button className='btn btn-danger' data-toggle="modal" data-target="#modalRechazo"onClick={() => rechazarDenuncia()}>Rechazar</button>
                        <button className='btn btn-primary' data-toggle="modal" data-target="#modalCompensacion"onClick={() => aprobarDenuncia()}>Aceptar</button>
                    </div>
                </div>
            </div>
            {ModalRechazo()}
            {ModalGenerarCompensacion()}
        </div>
        
    )
}

VerificarDenuncias.propTypes = {

    history: PropTypes.object,
  
  }

export default withRouter(VerificarDenuncias)