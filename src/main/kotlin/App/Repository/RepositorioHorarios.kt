package App.Repository

import App.Domain.Horarios

import org.springframework.data.repository.CrudRepository

interface RepositorioHorarios: CrudRepository<Horarios, Long> {

     fun findByHorario(horario: Double): Horarios
}