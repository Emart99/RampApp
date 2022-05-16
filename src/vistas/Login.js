import { useState } from "react"
import { useHistory } from 'react-router-dom';

export function Login() {
    const [usuario, setUsuario] = useState("")
    const [contraseña, setContraseña] = useState("")
    var history = useHistory()
    const pushToDenunciasAVerificar = () => history.push('/denunciasAVerificar')

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card  login-card" style={{ borderRadiu: '1rem' }}>
                            <div className="card-body p-5 text-center">

                                <form className="mb-md-4 mt-md-4 ">

                                    <h1 className="fw-bold text-uppercase">RampApp</h1>
                                    <h4 className="fw-bold mb-5 text-uppercase">Admin Login</h4>
                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label">Usuario</label>
                                        <input type="email" onChange={(e) => setUsuario(e.target.value)} placeholder="ingrese su usuario" className="form-control text-center form-control-lg" />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label">Contraseña</label>
                                        <input type="password" onChange={(e) => setContraseña(e.target.value)} placeholder="ingrese su contraseña" className="form-control text-center form-control-lg" />
                                    </div>
                                    <button className="btn btn-primary btn-lg mt-4 px-5" onClick={pushToDenunciasAVerificar} type="submit">Ingresar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}