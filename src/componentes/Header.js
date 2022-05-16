import {BiLogOut} from 'react-icons/bi'
export function Header() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#A9A9A9'}}>
            <a className="navbar-brand" style={{marginLeft:'3rem'}} >Admin</a>
            <button className="navbar-toggler" style={{marginRight:'3rem'}} type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" style={{marginRight:'3rem'}} id="navbarText">
                <ul className="navbar-nav text-center">
                <li className="nav-item active">
                    <a className="nav-link" href='/balance' >Balances <span className="sr-only"></span></a>
                </li>
                <li className="nav-item" >
                    <a className="nav-link" href='/denunciasAVerificar'>Verificar denuncias</a>
                </li>
                <li className="nav-item" >
                    <a className="nav-link" href='/rampasAHabilitar'>Habilitar rampas</a>
                </li>
                <li className="nav-item" >
                    <a className="nav-link" href='/login' ><BiLogOut/></a>
                </li>
                </ul>
            </div>
        </nav>

    )
}