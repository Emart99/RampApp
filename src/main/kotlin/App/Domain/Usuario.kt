package App.Domain

import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.Email

@Entity
open class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0

    @Column(length=150)
    var nombre: String = ""

    @Column(length=150)
    var apellido: String = ""

    @Column(length=12)
    var dni: Long = 0

    @Column(length=12)
    var fechaDeNacimiento: LocalDate = LocalDate.now()

    @Column(length=150)
    var userName: String = ""

    @Column(length=150)
    var contrasenia: String = ""

    @Column(length=150)
    var email: String = ""

    @OneToMany(fetch=FetchType.EAGER, cascade= [CascadeType.ALL])
    @OrderColumn
    @JoinColumn(name = "usuarioId")
    var rampasPropias= mutableListOf<Rampa>()


    @OneToMany(fetch= FetchType.EAGER, cascade= [CascadeType.ALL])
    @OrderColumn
    @JoinColumn(name = "usuarioId")
    var vehiculos= mutableListOf<Vehiculo>()
}
