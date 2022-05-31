package App.Domain

import javax.persistence.*

@Entity
open class Locador: Usuario() {

    @OneToMany(fetch=FetchType.EAGER, cascade= [CascadeType.ALL])
    @OrderColumn
    var rampasPropias= mutableListOf<Rampa>()


}