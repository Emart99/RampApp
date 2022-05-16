import { ModalRechazo } from './../componentes/ModalRechazo';
import { ModalGenerarCompensacion } from './../componentes/ModalGenerarCompensacion';
export function VerificarDenuncias() {

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-5'>Verificar Denuncia</h2>
            <div className='row'>
                <div className='col-md-6'>
                    <img className='imagen-verificar-denuncias' src='https://i.imgur.com/adhuzW9.png' alt='...' />
                </div>
                <div className='col-md-6 verificar-denuncia-datos '>
                    <div>Fecha: 10/03/00</div>
                    <div>Hora: 10:00</div>
                    <div>Direccion: Av.JorgeEgger123</div>
                    <div>Dominio: BCX-333</div>
                    <div>Motivo: MotivoRandom123456</div>
                    <div className="d-flex justify-content-around">
                        <button className='btn btn-danger' data-toggle="modal" data-target="#modalRechazo">Rechazar</button>
                        <button className='btn btn-primary' data-toggle="modal" data-target="#modalCompensacion">Aceptar</button>

                    </div>
                </div>
            </div>
            {ModalRechazo()}
            {ModalGenerarCompensacion()}
        </div>
        
    )
}