export function HabilitarRampa(){
    return(
        <div className='container mt-5'>
            <h2 className='text-center mb-5'>Habilitar Rampa</h2>
            <div className='row'>
                <div className='col-md-6 mb-5'>
                    <div className='text-center'>Foto Escritura</div>
                    <img className='imagen-verificar-denuncias' src='https://i.imgur.com/dc7ZNOJ.png' alt='...' />
                </div>
                <div className='col-md-6 verificar-denuncia-datos '>
                    <div>Foto DNI:</div>
                    <img  src='https://i.imgur.com/ePtnlpa.png' alt='...' />
                    <div>Fecha: 10/03/00</div>
                    <div>Hora: 10:00</div>
                    <div>Direccion: Av.JorgeEgger123</div>
                    <div className="d-flex justify-content-around">
                        <button className='btn btn-danger'>Rechazar</button>
                        <button className='btn btn-primary'>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}