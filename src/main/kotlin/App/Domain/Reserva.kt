package App.Domain

import java.time.LocalDate
import java.time.LocalDateTime

import javax.persistence.*

@Entity
class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0

    @Column(length=20)
    var horaInicioReserva: LocalDateTime = LocalDateTime.now()

    @Column(length=20)
    var horaFinReserva: LocalDateTime = LocalDateTime.now()

    @Column(length=20)
    var fechaReserva: LocalDate = LocalDate.now()

    @Column(length=15)
    var importePagado: Double = 0.00

}
