package App.Domain

import com.fasterxml.jackson.annotation.JsonView
import javax.persistence.*

@Entity
class Rampa {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0

    @Column(length=150)
    var calle: String = ""

    @Column(length=5)
    var altura: Int = 0

    @Column(length=5)
    var nroPartidaInmobiliaria: Int = 0

    var estadoRampa: String = "Disponible"

    @OneToMany(fetch= FetchType.EAGER)
    @OrderColumn
    var reservasRealizadas: MutableCollection<Reserva> =mutableListOf()


}
