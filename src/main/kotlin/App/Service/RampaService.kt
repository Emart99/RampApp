package App.Service

import App.Domain.*
import App.Repository.RepositorioAdministrador
import App.Repository.RepositorioRampas
import App.Repository.RepositorioRampasPendienteAprobacion
import App.Repository.RepositorioUsuario
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDateTime

@Service
class RampaService {

    @Autowired
    lateinit var repositorioRampa: RepositorioRampas
    @Autowired
    lateinit var repositorioRampaPendienteAprobacion: RepositorioRampasPendienteAprobacion
    @Autowired
    lateinit var repositorioHorarios: RepositorioAdministrador

    @Autowired
    lateinit var repositorioUsuario: RepositorioUsuario

    @Autowired
    lateinit var usuarioService:UsuarioService

    @Transactional
    fun traerRampasParaRamapasDisponibles(): List<Rampa> {
        val horaActual = LocalDateTime.now()
        val todasLasRampas = repositorioRampa.findAll()
        todasLasRampas.forEach {rampa -> rampa.controlarEstadoRampa(horaActual)}
       repositorioRampa.saveAll(todasLasRampas)
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
            val locador = usuarioService.buscarUsuaiorId(idUsuario)
            val rampaPendiente= RampaPendienteAprobacion(rampaNueva.posx
                ,rampaNueva.posy,rampaNueva.calle,rampaNueva.altura, rampaNueva.nroPartidaInmobiliaria, rampaNueva.imagenDni, rampaNueva.imagenRampa,rampaNueva.imagenEscritura,locador)
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

    @Transactional
    fun reservarRampa(idRampa: Long,idUsuario: Long, reserva: Reserva): Rampa {
        repositorioUsuario
            .findById(idUsuario)
            .map {
                it.reservasRealizadas.add(reserva)
                repositorioUsuario.save(it)
            }
            .orElseThrow {
                ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario con identificador $idUsuario no existe")
            }
        return repositorioRampa
            .findById(idRampa)
            .map {
                it.realizarReserva(reserva)
                repositorioRampa.save(it)
                it
            }
            .orElseThrow {
                ResponseStatusException(HttpStatus.NOT_FOUND, "La Rampa con identificador $idRampa no existe")
            }

    }
}
