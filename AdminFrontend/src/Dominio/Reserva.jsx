export class Reserva{
    // eslint-disable-next-line
    constructor(id,horaInicioReserva,horaFinReserva,fechaReserva,importePagado){
        this.id = id
        this.horaInicioReserva = horaInicioReserva
       this.horaFinReserva= horaFinReserva
       this.fechaReserva= fechaReserva
       this.importePagado = importePagado
    }

    static FromJson(reservaJson){
        const result = Object.assign(new Reserva(), reservaJson)
        return result
    }
}