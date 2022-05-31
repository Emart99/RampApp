package App

import App.Domain.*
import App.Repository.RepositorioAdministrador
import App.Repository.RepositorioRampas
import App.Repository.RepositorioUsuario
import App.Repository.RepositorioVehiculos
import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class Bootstrap : InitializingBean {

    @Autowired
    private lateinit var repositorioUsuarios: RepositorioUsuario

    @Autowired
    lateinit var repositorioRampas: RepositorioRampas

    @Autowired
    lateinit var repositorioVehiculo: RepositorioVehiculos

    @Autowired
    lateinit var repositorioHorarios: RepositorioAdministrador

    fun crearUsuario() {
        var usuario1 = Locador().apply {
            nombre = "Tomas"
            apellido = "Gomez"
            dni = 34101124
            fechaDeNacimiento= LocalDate.now().minusYears(26)
            userName = "TGomez"
            contrasenia = "1"
            email= "tgomez@ramapp.com"
        }

        val usuario2 = Locador().apply {
            nombre = "Jane"
            apellido = "Fernadez"
            dni = 33211124
            fechaDeNacimiento= LocalDate.now().minusYears(19)
            userName = "JFernandez"
            contrasenia = "2"
            email= "jfernandez@ramapp.com"

        }

        val usuario3 = Locatario().apply {
            nombre = "Ezequiel"
            apellido = "Gago"
            dni = 31211124
            fechaDeNacimiento= LocalDate.now().minusYears(62)
            userName = "EGago"
            contrasenia = "3"
            email= "Egago@ramapp.com"

        }

        val usuario4 = Locatario().apply {
            nombre = "Pablo"
            apellido = "Acme"
            dni = 29211124
            fechaDeNacimiento= LocalDate.now().minusYears(35)
            userName = "PAcme"
            contrasenia = "4"
            email= "Pacme@ramapp.com"

        }

        val rampa1 = Rampa().apply{
            calle = "corrientes"
            altura = 132
            nroPartidaInmobiliaria = 24124
        }

        val rampa2 = Rampa().apply{
            calle = "Borges"
            altura = 5215
            nroPartidaInmobiliaria = 26434
        }

        val horario1 = Horarios().apply {
            horarioDesde =12.00
            horarioHasta = 20.00
        }

        val rampa3 = Rampa().apply{
            calle = "Santa Fe"
            altura = 4234
            nroPartidaInmobiliaria = 46032
            estadoRampa = "Ocupada"
        }

        val vehiculo1 = Vehiculo().apply{
            marca = "Ford"
            modelo = "Fiesta"
            dominio = "KEQ989"
        }

        val vehiculo2 = Vehiculo().apply{
            marca = "Ford"
            modelo = "Mondeo"
            dominio = "PEO342"
        }

        rampa3.agregarHorario(horario1)
        repositorioVehiculo.save(vehiculo1)
        repositorioVehiculo.save(vehiculo2)
        repositorioRampas.save(rampa1)
        repositorioRampas.save(rampa2)
        repositorioRampas.save(rampa3)
        repositorioUsuarios.save(usuario1)
        repositorioUsuarios.save(usuario2)
        repositorioUsuarios.save(usuario3)
        repositorioUsuarios.save(usuario4)

        usuario1.rampasPropias.add(rampa1)
        usuario2.rampasPropias.add(rampa3)
        usuario2.rampasPropias.add(rampa2)
        usuario3.vehiculos.add(vehiculo1)
        usuario4.vehiculos.add(vehiculo2)
    }

    override fun afterPropertiesSet() {
        crearUsuario()
        crearAdministrador()
    }

    fun crearAdministrador() {
        val admin1 = Administrador().apply {
            nombre = "Edgardo"
            apellido = "Ramirez "
            cuil = 30-29211124-1
            userName = "admin"
            contrasenia = "admin"
        }

    }
}