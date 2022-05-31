package App.Domain

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

    fun agregarHorario(horario1: Horarios) {
        horariosDisponibles.add(horario1)
    }


   // @OneToMany(fetch= FetchType.EAGER)
   // @OrderColumn
   // var reservasRealizadas: MutableCollection<Reserva> =mutableListOf()
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
    var usuarioPropietario: Locador= Locador())
{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0
}

