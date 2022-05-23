package App.Repository

import App.Domain.Locador
import App.Domain.Usuario
import org.springframework.data.repository.CrudRepository
import java.util.*

interface RepositorioUsuario  : CrudRepository<Usuario, Long> {

    fun findByUserNameAndContrasenia(userName: String, contrasenia:String): Optional<Usuario>

     fun findByDni(dni: Long): Usuario?
}