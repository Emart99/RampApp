import React from 'react'
import { useState, useEffect } from "react"
import { adminService } from '../services/AdminService';
import { obtenerMensaje } from "../services/obtenerMensaje";

export function DenunciasAVerificar() {

    const [denunciasAHabilitar, setDenunciasAHabilitar] = useState([])
    const [errorMessage, SetErrorMessage ] = useState("")

    const denunciaAHabilitar = async () => {
        try{
        const canti = await adminService.traerDenunciasAHabilitar()
        setDenunciasAHabilitar(canti)}catch (error) {
            const message = obtenerMensaje(error)
            SetErrorMessage(message)
            console.log(errorMessage)
          }
    }
 
     useEffect(() => {

        denunciaAHabilitar()
     }, [])


    return (
        <div className='container mt-5'>
            <div className='row text-center'>
                <p className='col'>Fecha</p>
                <p className='col'>Direccion</p>
                <p className='col'>Vehiculo</p>
            </div >
            {denunciasAHabilitar.map((data)=>   
            <a href={'/verificarDenuncia/'+ data.id}>
                <div className="card pt-2 pb-2 mt-3 bg-dark text-white ">
                    <div className='row text-center'>
                        <div className='col'>{data.fecha}</div>
                        <div className='col'>{data.direccionRampa}</div>
                        <div className='col'>{data.dominio}</div>
                    </div>
                </div>
            </a>)}
        </div>
    )
}