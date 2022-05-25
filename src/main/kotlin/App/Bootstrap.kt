package App

import App.Domain.*
import App.Repository.RepositorioHorarios
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
    lateinit var repositorioHorarios: RepositorioHorarios

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
        crearHorarios()
    }

    fun crearHorarios() {
        val horario1 = Horarios().apply {horario = 0.00}
        val horario2 = Horarios().apply {horario = 1.00}
        val horario3 = Horarios().apply {horario = 2.00}
        val horario4 = Horarios().apply {horario = 3.00}
        val horario5 = Horarios().apply {horario = 4.00}
        val horario6 = Horarios().apply {horario = 5.00}
        val horario7 = Horarios().apply {horario = 6.00}
        val horario8 = Horarios().apply {horario = 7.00}
        val horario9 = Horarios().apply {horario = 8.00}
        val horario10 = Horarios().apply {horario = 9.00}
        val horario11 = Horarios().apply {horario = 10.00}
        val horario12 = Horarios().apply {horario = 11.00}
        val horario13 = Horarios().apply {horario = 12.00}
        val horario14 = Horarios().apply {horario = 13.00}
        val horario15 = Horarios().apply {horario = 14.00}
        val horario16 = Horarios().apply {horario = 15.00}
        val horario17 = Horarios().apply {horario = 16.00}
        val horario18 = Horarios().apply {horario = 17.00}
        val horario19 = Horarios().apply {horario = 18.00}
        val horario20 = Horarios().apply {horario = 19.00}
        val horario21 = Horarios().apply {horario = 20.00}
        val horario22 = Horarios().apply {horario = 21.00}
        val horario23 = Horarios().apply {horario = 22.00}
        val horario24 = Horarios().apply {horario = 23.00}
        repositorioHorarios.save(horario1)
        repositorioHorarios.save(horario2)
        repositorioHorarios.save(horario3)
        repositorioHorarios.save(horario4)
        repositorioHorarios.save(horario5)
        repositorioHorarios.save(horario6)
        repositorioHorarios.save(horario7)
        repositorioHorarios.save(horario8)
        repositorioHorarios.save(horario9)
        repositorioHorarios.save(horario10)
        repositorioHorarios.save(horario11)
        repositorioHorarios.save(horario12)
        repositorioHorarios.save(horario13)
        repositorioHorarios.save(horario14)
        repositorioHorarios.save(horario15)
        repositorioHorarios.save(horario16)
        repositorioHorarios.save(horario17)
        repositorioHorarios.save(horario18)
        repositorioHorarios.save(horario19)
        repositorioHorarios.save(horario20)
        repositorioHorarios.save(horario21)
        repositorioHorarios.save(horario22)
        repositorioHorarios.save(horario23)
        repositorioHorarios.save(horario24)
    }
}