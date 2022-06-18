
import React from 'react'
import { useState, useEffect } from "react"
import { adminService } from '../services/AdminService';
import { obtenerMensaje } from "../services/obtenerMensaje";
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'


export const RampasAHabilitar= ({history}) =>{

    const [rampasAHabilitar, setRampasAHabilitar] = useState([])
    const [errorMessage, SetErrorMessage ] = useState("")


    const rampaAHabilitar = async () => {
        try{
        const canti = await adminService.traerRampasAHabilitar()
        setRampasAHabilitar(canti)}catch (error) {
            const message = obtenerMensaje(error)
            SetErrorMessage(message)
          }
    }
 
     useEffect(() => {
        rampaAHabilitar()
     }, [])


    return(
        <div className='container mt-5'>
            <div className='row text-center'>
                <p className='col'>Fecha</p>
                <p className='col'>Direccion</p>
                <p className='col'>Usuario</p>
            </div>
        {rampasAHabilitar.map((data)=>   
        <a href={'/habilitarRampa/'+ data.id}>
        <div className="card pt-2 pb-2 mt-3 bg-dark text-white ">
            <div className='row text-center'>
                <div className='col'>{data.fechaCarga}</div>
                <div className='col'>{data.calle}</div>
                <div className='col'>{data.nombrePropietario}</div>
            </div>
            </div>
            </a> )}
        </div>
    )
}

RampasAHabilitar.propTypes = {

    history: PropTypes.object,
  
  }

export default withRouter(RampasAHabilitar)