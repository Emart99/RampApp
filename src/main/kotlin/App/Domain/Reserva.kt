package App.Domain

import java.time.LocalDate
import java.time.LocalTime
import java.util.Date
import javax.persistence.*

@Entity
class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0

    @Column(length=20)
    var horaInicioReserva: LocalTime = LocalTime.now()

    @Column(length=20)
    var horaFinReserva: LocalTime = LocalTime.now()

    @Column(length=20)
    var fechaReserva: LocalDate = LocalDate.now()

    @Column(length=15)
    var importePagado: Double = 0.00

}
