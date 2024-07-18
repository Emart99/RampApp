
import { useState } from 'react';
import { DatePicker, Space } from 'antd';
//import 'antd/dist/antd.css';
import { adminService } from '../services/AdminService';
import { obtenerMensaje } from "../services/obtenerMensaje";

export function Balance(){
    const [fecha, setFecha] = useState(null);
    const [reservas, setReservas] = useState([])
    const [errorMessage, SetErrorMessage ] = useState("")
   
    const fechaHandler = (e) =>{
        setFecha(e.format("YYYY-MM-DD"));
        obtenerBalance(e.format("YYYY-MM-DD"))
    }

    const obtenerBalance = async (fecha2) => {
        try{
        const reservas = await adminService.traerReservasPorFecha(fecha2)
        setReservas(reservas)}catch (error) {
            const message = obtenerMensaje(error)
            SetErrorMessage(message)
            console.log(errorMessage)
          }
    }


    return(
       
        <div className='container mt-5'>
            
            <div className='d-flex justify-content-around mb-5'>
            <Space direction="vertical">
                <DatePicker placeholder='Filtro por fecha' onChange={fechaHandler} picker="days" style={{width:'300px'}}/>
                {console.log(fecha)}
            </Space>
            </div>
            
            <div className='row text-center'>
                <p className='col'>Fecha</p>
                <p className='col'>N° Reserva</p>
                <p className='col'>Hora Desde</p>
                <p className='col'>Hora Hasta</p>
                <p className='col'> Precio</p>
            </div>
            {reservas.map((data)=>  
            <div className="card pt-2 pb-2 mt-3 bg-dark text-white ">
                <div className='row text-center'>
                    <div className='col'>{data.fechaReserva}</div>
                    <div className='col'>{data.id}</div>
                    <div className='col'>{data.horaInicioReserva}</div>
                    <div className='col'>{data.horaFinReserva}</div>
                    <div className='col'>$ {data.importePagado}</div>
                </div>
            </div>)}
        </div>
       
    )
}