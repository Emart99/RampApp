package App.Service

import App.Domain.*
import App.Repository.RepositorioAdministrador
import App.Repository.RepositorioRampas
import App.Repository.RepositorioRampasPendienteAprobacion
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException

@Service
class RampaService {

    @Autowired
    lateinit var repositorioRampa: RepositorioRampas
    @Autowired
    lateinit var repositorioRampaPendienteAprobacion: RepositorioRampasPendienteAprobacion
    @Autowired
    lateinit var repositorioHorarios: RepositorioAdministrador


    @Autowired
    lateinit var usuarioService:UsuarioService

    @Transactional(readOnly = true)
    fun traerRampasParaRamapasDisponibles(): List<Rampa> {
        val estadoABuscar= EstadoRampa().apply{
            nombreDeEstado = "Disponible"
        }
        return repositorioRampa.findAllByEstadoRampaEquals(estadoABuscar.nombreDeEstado)
    }

    @Transactional(readOnly = true)
    fun traerRampaPorID(id: Long): Rampa =
        repositorioRampa.findById(id).orElseThrow {
        ResponseStatusException(HttpStatus.NOT_FOUND, "La rampa con identificador $id no existe")
    }

    @Transactional(readOnly = false)
    fun registrarNuevaRampa(idUsuario: Long, rampaNueva: Rampa){
        var rampaARegistrar: Rampa? = this.repositorioRampa.findByNroPartidaInmobiliaria(rampaNueva.nroPartidaInmobiliaria)
        if (rampaARegistrar  === null) {
            val locador = usuarioService.buscarUsuaiorId(idUsuario) as Locador
            val rampaPendiente= RampaPendienteAprobacion(rampaNueva.calle,rampaNueva.posx
                ,rampaNueva.posy,rampaNueva.altura, rampaNueva.nroPartidaInmobiliaria, locador)
            repositorioRampaPendienteAprobacion.save(rampaPendiente)
            }else {
               ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario con dni ${rampaNueva.nroPartidaInmobiliaria} ya se encuentra registrado")
            }
    }

    fun modificarHorariosRampa(idRampa: Long, rampaModificadora:Rampa): Rampa {
        return repositorioRampa
            .findById(idRampa)
            .map {
                it.horariosDisponibles= rampaModificadora.horariosDisponibles
                repositorioRampa.save(it)
                it
            }
            .orElseThrow {
                ResponseStatusException(HttpStatus.NOT_FOUND, "La Rampa con identificador $idRampa no existe")
            }
    }
}
