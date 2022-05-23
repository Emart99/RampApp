package App.Domain

import javax.persistence.FetchType
import javax.persistence.OneToMany
import javax.persistence.OrderColumn


class Administrador {

    @OneToMany(fetch= FetchType.EAGER)
    @OrderColumn
    var denunciasRealizadas= mutableListOf<Denuncia>()

    fun aprobarRampa(){
    }
}