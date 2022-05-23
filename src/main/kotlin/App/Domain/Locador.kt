package App.Domain

import javax.persistence.*

@Entity
open class Locador: Usuario() {

    @OneToMany(fetch=FetchType.EAGER)
    @OrderColumn
    var rampasPropias= mutableListOf<Rampa>()


}