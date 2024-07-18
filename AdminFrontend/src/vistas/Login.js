import { useState } from "react"
import { useHistory } from 'react-router-dom';
import { adminService } from "../services/AdminService";
import { obtenerMensaje } from "../services/obtenerMensaje";

import { InputLogin } from "../componentes/InputLogin";
import { MostrarError } from "../componentes/MostrarError";
import { Administrador } from "../Dominio/Administrador";

export function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, SetErrorMessage ] = useState("")
    var history = useHistory()


    const asignarUsuario = async(event) =>{
        event.preventDefault();
        try{  
          const login = new Administrador(0,"","","",userName,password)
          await adminService.getBuscarUsuario(login)
          history.push('/denunciasAVerificar')}
          catch (error) {
              const message = obtenerMensaje(error)
              SetErrorMessage(message)
              console.log(errorMessage)
          }
      }
      
      
    
      const limpiarError=()=>{
        SetErrorMessage("")
      }

    return (
      <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card  login-card" style={{ borderRadiu: '1rem' }}>
                      <div className="card-body p-5 text-center">
                      <form onSubmit={asignarUsuario} className="mb-md-4 mt-md-4 ">
                      <h1 className="fw-bold ">RampApp</h1>
                      <InputLogin textoTitulo = "Usuario" type ="username" value={userName} onClick= {()=>limpiarError()} onChange= {(nuevoUsuario) => setUserName(nuevoUsuario)} />
                      <InputLogin textoTitulo = "Contreaseña" type = "password" value={password} onClick= {()=>limpiarError()} onChange= {(nuevaContraseña) => setPassword(nuevaContraseña)} />    
                      <button type="submit" className="btn btn-primary btn-lg mt-4 px-5">
                        Ingresar
                      </button>
                      </form>
                            </div>
                            <MostrarError errorMessage={errorMessage}>
                            </MostrarError>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
