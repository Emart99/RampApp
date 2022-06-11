package App.Domain


import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Rampa {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0

    @Column(length=150)
    var posx: String = ""

    @Column(length=150)
    var posy: String = ""

    @Column(length=150)
    var calle: String = ""

    @Column(length=5)
    var altura: Int = 0

    @Column(length=5)
    var nroPartidaInmobiliaria: Int = 0

    var estadoRampa: String = "Disponible"

    @OneToMany(fetch=FetchType.EAGER, cascade= [CascadeType.ALL])
    var horariosDisponibles = mutableListOf<Horarios>()


    @OneToMany(fetch= FetchType.EAGER, cascade= [CascadeType.ALL])
    @OrderColumn
    var reservasRealizadas: MutableCollection<Reserva> =mutableListOf()


   fun realizarReserva(unaReserva: Reserva){
       reservasRealizadas.add(unaReserva)
       val horario= horariosDisponibles.any {horarios -> (horarios.horarioDesde <= unaReserva.horaInicioReserva) && (horarios.horarioHasta >= unaReserva.horaInicioReserva)}
       horariosDisponibles.removeIf { horario }
   }

    fun agregarHorario(horario1: Horarios) {
        horariosDisponibles.add(horario1)
    }


    fun controlarEstadoRampa(hora: LocalDateTime){
       if(horariosDisponibles.any {horarios -> (horarios.horarioDesde < hora) && (horarios.horarioHasta > hora)})
            {this.estadoRampa =  "Disponible"}
       else if(reservasRealizadas.any {reserva -> (reserva.horaInicioReserva < hora) && (reserva.horaFinReserva > hora)})
               this.estadoRampa = "Alquilada"
       else this.estadoRampa = "Ocupada"
       }


}

@Entity
class RampaPendienteAprobacion(

    @Column(length=150)
    var posx: String = "",

    @Column(length=150)
    var posy: String = "",

    @Column(length=150)
    var calle: String = "",

    @Column(length=5)
    var altura: Int = 0,

    @Column(length=5)
    var nroPartidaInmobiliaria: Int = 0,

    @OneToOne(fetch= FetchType.EAGER)
    var usuarioPropietario: Usuario= Usuario())
{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0
}

