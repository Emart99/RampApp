
import { useState } from 'react';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';

export function Balance(){
    const [fecha, setFecha] = useState(null);
    const fechaHandler = (e) =>{
        setFecha(e)
    }
    return(
       
        <div className='container mt-5'>
            
            <div className='d-flex justify-content-around mb-5'>
            <Space direction="vertical">
                <DatePicker placeholder='Filtro por fecha' onChange={fechaHandler} picker="year" style={{width:'300px'}}/>
                {console.log(fecha)}
            </Space>
            </div>
            
            <div className='row text-center'>
                <p className='col'>Fecha</p>
                <p className='col'>Hora Desde/Hasta</p>
                <p className='col'>Direccion</p>
                <p className='col'> Precio</p>
            </div>
            <div className="card pt-2 pb-2 mt-3 bg-dark text-white ">
                <div className='row text-center'>
                    <div className='col'>10/06/33</div>
                    <div className='col'>14:00/17:00</div>
                    <div className='col'>AV.jorgeEgger123</div>
                    <div className='col'>$333</div>
                </div>
            </div>
        </div>
       
    )
}