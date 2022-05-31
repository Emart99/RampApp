package App.Repository

import App.Domain.Administrador

import org.springframework.data.repository.CrudRepository

interface RepositorioAdministrador: CrudRepository<Administrador, Long> {


}