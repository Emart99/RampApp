export class RampaPendienteAprobacion{
    // eslint-disable-next-line
    constructor(id,fechaCarga,calle,altura,nombrePropietario){
        this.id = id
        this.fechaCarga = fechaCarga
       this.calle= calle
       this.altura= altura
       this.nombrePropietario = nombrePropietario

      
    }

    static FromJson(rampaJson){
        const result = Object.assign(new RampaPendienteAprobacion(), rampaJson)
        return result
    }
}