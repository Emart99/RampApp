import {useEffect, useState} from 'react';
import { adminService } from '../services/AdminService';
import { obtenerMensaje } from "../services/obtenerMensaje";
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'


export const  HabilitarRampa = ({history}) =>{
    
    const [rampa,setRampa] = useState('')
    const [errorMessage, SetErrorMessage ] = useState("")
    const {id} = useParams()


    const rampaAHabilitar = async () => {
        try{
        const canti = await adminService.traerRampa(id)
        setRampa(canti)}catch (error) {
            const message = obtenerMensaje(error)
            SetErrorMessage(message)
          }
    }

    const rechazarRampa = async() =>{
        try{  
          await adminService.rechazarRampa(id)
          pushToRampasAVerificar()}
          catch (error) {
              const message = obtenerMensaje(error)
              SetErrorMessage(message)
          }
      }

      const aprobarRampa = async() =>{
        try{  
          await adminService.aprobarRampa(id)
          pushToRampasAVerificar()}
          catch (error) {
              const message = obtenerMensaje(error)
              SetErrorMessage(message)
          }
      }

      const pushToRampasAVerificar = () => history.push('/rampasAHabilitar')

    
    useEffect(() => {
        rampaAHabilitar();
      },[]);
    
    
    return(
        <div className='container mt-5'>
            <h2 className='text-center mb-5'>Habilitar Rampa</h2>
            <div className='row'>
                <div className='col-md-6 mb-5'>
                    <div className='text-center'>Foto Escritura</div>
                    <img className='imagen-verificar-denuncias' src={rampa.imagenEscritura} alt='...' />
                </div>
                <div className='col-md-6 verificar-denuncia-datos '>
                    <div>Foto DNI:</div>
                    <img  src={rampa.imagenDni} alt='...' />
                    <div>Fecha: {rampa.fechaCarga} </div>
                    <div>Direccion: {rampa.calle}</div>
                    <div className="d-flex justify-content-around">
                        <button className='btn btn-danger' onClick={() => rechazarRampa()}>Rechazar</button>
                        <button className='btn btn-primary' onClick={() => aprobarRampa()}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

HabilitarRampa.propTypes = {

    history: PropTypes.object,
  
  }

export default withRouter(HabilitarRampa)