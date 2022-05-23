package App.Controller

import App.Domain.Usuario
import App.Domain.Vehiculo
import App.Service.UsuarioService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins=["*"])
class UsuarioController {

    @Autowired
    lateinit var usuarioService: UsuarioService

    @PostMapping("/usuario/login")
    @Operation(summary ="Devuelve el usuario cuyo username y contraseña coincide con lo que pasamos como parámetro")
    fun buscarLoguearse(@RequestBody usuario: Usuario): Usuario = usuarioService.buscar(usuario)

    @PutMapping("/usuario/registrar ")
    @Operation(summary ="crea un usuario que no esta registrado con Dni")
    fun registrarUsuario(@RequestBody usuario: Usuario) = usuarioService.registrarNuevoUsuario(usuario)

    @PutMapping("/agregarVehiculo/{idUsuario}")
    @Operation(summary ="permite agregar un vehiculo no registrado")
    fun agregarVehiculoUsuario(@PathVariable idUsuario: Long,@RequestBody vehiculoNuevo: Vehiculo) = usuarioService.agregarVehiculo(idUsuario, vehiculoNuevo)


}