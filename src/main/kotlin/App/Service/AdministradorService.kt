package App.Service

import App.Domain.*
import App.Repository.RepositorioAdministrador
import App.Repository.RepositorioDenuncias
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

    @Autowired
    lateinit var repositorioDenuncias: RepositorioDenuncias

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
          }
        usuario.rampasPropias.add(rampa)
        repositorioRampa.save(rampa)
        repositorioRampaPendienteAprobacion.deleteById(rampaAHabilitar.id)
        return admin
    }

    fun traerRampasPendientesAprobacion(): MutableIterable<RampaPendienteAprobacion> {
        return this.repositorioRampaPendienteAprobacion.findAll()
    }

    fun traerDenunciasPendientesAprobacion(): MutableIterable<Denuncia> {
        val estadoABuscar= EstadoRampa().apply{
            nombreDeEstado = "Pendiente"
        }
        return this.repositorioDenuncias.findAllByEstadoDenuncia(estadoABuscar.nombreDeEstado)

    }

    fun aprobarDenuncia(idDenuncia: Long): Denuncia {
     return repositorioDenuncias.findById(idDenuncia).map {
            it.estadoDenuncia = "Aprobada"
            repositorioDenuncias.save(it)
            it
        }.orElseThrow{
        ResponseStatusException(HttpStatus.NOT_FOUND, "No se pudo aprobar la denuncia")
        }
    }

    fun rechazarDenuncia(idDenuncia: Long): Denuncia {
        return repositorioDenuncias.findById(idDenuncia).map {
            it.estadoDenuncia = "Rechazada"
            repositorioDenuncias.save(it)
            it
        }.orElseThrow{
            ResponseStatusException(HttpStatus.NOT_FOUND, "No se pudo rechazar la denuncia")
        }
    }
}