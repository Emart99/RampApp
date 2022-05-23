package App.Domain

import javax.persistence.*

@Entity
class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0

    @OneToOne(fetch= FetchType.EAGER)
    @OrderColumn
    var tipoDenuncia: TipoDenuncia = TipoDenuncia()

    @OneToOne(fetch= FetchType.EAGER)
    @OrderColumn
    var estadoDenuncia: EstadoDenuncia = EstadoDenuncia()

    @OneToOne(fetch= FetchType.EAGER)
    @OrderColumn
    var realizadaPor: Usuario = Usuario()

    var imagen: String = ""

}
