package App.Controller

import App.Domain.*
import App.Service.AdministradorService
import App.Service.UsuarioService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins=["*"])
class AdministradorController {

    @Autowired
    lateinit var administradorService: AdministradorService

    @PostMapping("/administrador/login")
    @Operation(summary ="Devuelve el admin cuyo username y contraseña coincide con lo que pasamos como parámetro")
    fun buscarLoguearse(@RequestBody admin: Administrador): Administrador = administradorService.buscar(admin)

    @GetMapping("/administrador/habilitarRampa/{idAdmin}")
    @Operation(summary ="El admin habilita una rampa pendiente de aprobacion ")
    fun habilitarRampa(@PathVariable idAdmin: Long, @RequestBody rampaAHabilitar: RampaPendienteAprobacion): Administrador = administradorService.habilitarRampa(idAdmin,rampaAHabilitar)

    @GetMapping("/administrador/rampasPendientesAprobacion")
    @Operation(summary ="Devuelve todas las rampas que se encuentran pendientes de aprobacion<")
    fun traerTodaLasRampasPendientesDeAprobacion():MutableIterable<RampaPendienteAprobacion> = administradorService.traerRampasPendientesAprobacion()

}