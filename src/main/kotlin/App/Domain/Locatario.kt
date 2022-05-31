package App.Domain

import javax.persistence.*
@Entity
open class Locatario: Usuario() {

    @OneToMany(fetch= FetchType.EAGER, cascade= [CascadeType.ALL])
    @OrderColumn
    var vehiculos= mutableListOf<Vehiculo>()
}