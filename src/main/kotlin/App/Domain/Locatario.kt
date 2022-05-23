package App.Domain

import javax.persistence.*
@Entity
open class Locatario: Usuario() {

    @OneToMany(fetch= FetchType.EAGER)
    @OrderColumn
    var vehiculos= mutableListOf<Vehiculo>()
}