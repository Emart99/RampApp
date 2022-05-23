package App.Repository

import App.Domain.Locador
import App.Domain.Rampa
import org.springframework.data.repository.CrudRepository

interface RepositorioRampas : CrudRepository<Rampa, Long> {

    // Esto no va a funcionar voy a hacer una query
    fun findAllByEstadoRampaEquals(estado: String): List<Rampa>
    fun findByNroPartidaInmobiliaria(nroPartidaInmobiliaria: Int): Rampa?
}