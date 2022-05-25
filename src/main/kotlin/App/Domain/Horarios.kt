package App.Domain

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Horarios {

    @Id
    @GeneratedValue
    var id: Long = 0

    var horario = 0.00

}
