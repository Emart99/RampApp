export class RampaPendienteAprobacion{
    // eslint-disable-next-line
    constructor(id,fechaCarga,calle,altura,nombrePropietario,imagenRampa,imagenDni,imagenEscritura){
        this.id = id
        this.fechaCarga = fechaCarga
       this.calle= calle
       this.altura= altura
       this.nombrePropietario = nombrePropietario
       this.imagenRampa = imagenRampa
       this.imagenDni = imagenDni
       this.imagenEscritura = imagenEscritura
    }

    static FromJson(rampaJson){
        const result = Object.assign(new RampaPendienteAprobacion(), rampaJson)
        return result
    }
}