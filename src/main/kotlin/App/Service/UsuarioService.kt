package App.Service

import App.Domain.Locatario
import App.Domain.Usuario
import App.Domain.Vehiculo
import App.Repository.RepositorioUsuario
import App.Repository.RepositorioVehiculos
import org.apache.el.parser.AstFalse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException

@Service
class UsuarioService {

    @Autowired
    lateinit var repositorioUsuarios: RepositorioUsuario

    @Autowired
    lateinit var repositorioVehiculo: RepositorioVehiculos

    @Transactional(readOnly = true)
    fun buscar(usuario: Usuario): Usuario =
        this.repositorioUsuarios.findByUserNameAndContrasenia(usuario.userName, usuario.contrasenia).orElseThrow {
            ResponseStatusException(HttpStatus.UNAUTHORIZED, "El usuario o la contraseña son incorrectas")
        }

    @Transactional(readOnly = true)
    fun buscarUsuaiorId(id: Long): Usuario =
        this.repositorioUsuarios.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
        }

    @Transactional(readOnly = false)
    fun registrarNuevoUsuario(usuario: Usuario){
        val usuarioARegistrar = repositorioUsuarios.findByDni(usuario.id)
        if (usuarioARegistrar === null) {
            repositorioUsuarios.save(usuario)
        } else {
            ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario con dni ${usuario.dni} ya se encuentra registrado")
        }
    }

   fun agregarVehiculo(idUsuario: Long, vehiculoNuevo: Vehiculo){
       val vehiculoARegistrar = repositorioVehiculo.findByDominio(vehiculoNuevo.dominio)
       if (vehiculoARegistrar === null) {
           val usuario = this.buscarUsuaiorId(idUsuario) as Locatario
           repositorioVehiculo.save(vehiculoNuevo)
           usuario.vehiculos.add(vehiculoNuevo)
       } else {
          ResponseStatusException(HttpStatus.NOT_FOUND, "El vehiculo con dominio ${vehiculoNuevo.dominio} ya se encuentra registrado")
       }
    }

}