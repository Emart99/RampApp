package App.Service

import App.Domain.Locador
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
    fun getUsuario(id: Long): Usuario =
        this.repositorioUsuarios.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "No existe usuario con ese id")}

    @Transactional(readOnly = true)
    fun buscarUsuaiorId(id: Long): Usuario =
        this.repositorioUsuarios.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
        }

    @Transactional(readOnly = true)
    fun registrarNuevoUsuario(usuario: Usuario): Usuario {
       val usuarioARegistrar = repositorioUsuarios.findByDni(usuario.dni)
        if (usuarioARegistrar === null) {
            repositorioUsuarios.save(usuario)
       } else {
            ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario con dni ${usuario.dni} ya se encuentra registrado")
       }
        return usuario
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

    fun eliminarVehiculoPorId(idUsuario: Long, vehiculoAEliminar: Vehiculo){
        val usuario = this.buscarUsuaiorId(idUsuario) as Locatario
        val vehiculo: Vehiculo= repositorioVehiculo.findById(vehiculoAEliminar.id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no existe")
        }
        usuario.vehiculos.remove(vehiculo)
        repositorioVehiculo.delete(vehiculo)
}

}