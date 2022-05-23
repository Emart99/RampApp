package App.Controller

import App.Domain.Rampa
import App.Domain.Usuario
import App.Service.RampaService
import com.fasterxml.jackson.annotation.JsonView
import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins=["*"])
class RampaController {

    @Autowired
    lateinit var rampaService: RampaService

    @GetMapping("/rampasDisponibles")
    @Operation(summary ="Devuelve todas las rampas que se encuentran Disponible")
    fun traerTodaLasRampasDisponibles():List<Rampa> = rampaService.traerRampasParaRamapasDisponibles()

    @GetMapping("/rampaDisponible/{id}")
    @Operation(summary ="permite buscar una rampa por su id")
    fun buscarUnaRampa(@PathVariable id: Long): Rampa = rampaService.traerRampaPorID(id)

    @PutMapping("/agregarRampa/{idUsuario}")
    @Operation(summary ="crea una rampa y se la agrega al usuario")
    fun registrarRampa(@PathVariable idUsuario: Long, @RequestBody rampaNueva : Rampa) = rampaService.registrarNuevaRampa(idUsuario,rampaNueva)

}