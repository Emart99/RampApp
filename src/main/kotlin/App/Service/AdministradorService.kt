package App.Service

import App.Domain.Administrador
import App.Domain.Rampa
import App.Domain.RampaPendienteAprobacion
import App.Repository.RepositorioAdministrador
import App.Repository.RepositorioRampas
import App.Repository.RepositorioRampasPendienteAprobacion
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException


@Service
class AdministradorService {

    @Autowired
    lateinit var repositorioAdministrador: RepositorioAdministrador

    @Autowired
    lateinit var repositorioRampaPendienteAprobacion: RepositorioRampasPendienteAprobacion

    @Autowired
    lateinit var repositorioRampa: RepositorioRampas

    @Transactional(readOnly = true)
    fun buscar(admin: Administrador): Administrador =
        this.repositorioAdministrador.findByUserNameAndContrasenia(admin.userName, admin.contrasenia).orElseThrow {
            ResponseStatusException(HttpStatus.UNAUTHORIZED, "El userName o la contraseña son incorrectas")
        }

    fun habilitarRampa(idAdmin: Long, rampaAHabilitar: RampaPendienteAprobacion): Administrador {
        val admin= repositorioAdministrador.findById(idAdmin).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "no existe el administrador son incorrectas") }
        val usuario = rampaAHabilitar.usuarioPropietario
        val rampa = Rampa().apply {
            posx = rampaAHabilitar.posx
            posy = rampaAHabilitar.posy
            calle = rampaAHabilitar.calle
            altura = rampaAHabilitar.altura
            nroPartidaInmobiliaria= rampaAHabilitar.nroPartidaInmobiliaria
            estadoRampa = "Disponible"
          }
        usuario.rampasPropias.add(rampa)
        repositorioRampa.save(rampa)
        repositorioRampaPendienteAprobacion.deleteById(rampaAHabilitar.id)
        return admin
    }

    fun traerRampasPendientesAprobacion(): MutableIterable<RampaPendienteAprobacion> {
        return this.repositorioRampaPendienteAprobacion.findAll()
    }
}