
export function RampasAHabilitar(){
    return(
        <div className='container mt-5'>
            <div className='row text-center'>
                <p className='col'>Fecha</p>
                <p className='col'>Direccion</p>
                <p className='col'>Usuario</p>
            </div>
            {/* aca enrealidad va a llegar una lista y va a haber que agregar un map */}
            <a href='/habilitarRampa/1'>
            <div className="card pt-2 pb-2 mt-3 bg-dark text-white ">
                <div className='row text-center'>
                    <div className='col'>10/06/33</div>
                    <div className='col'>AV.jorgeEgger</div>
                    <div className='col'>Gregorio1</div>
                </div>
            </div>
            </a> 
        </div>
    )
}