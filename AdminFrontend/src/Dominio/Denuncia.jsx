export class Denuncia{
    // eslint-disable-next-line
    constructor(id,fecha,tipoDenuncia,direccionRampa,estadoDenuncia,dominio, imagen,motivoDenuncia){
        this.id = id
        this.fecha = fecha
       this.tipoDenuncia= tipoDenuncia
       this.direccionRampa= direccionRampa
       this.estadoDenuncia = estadoDenuncia
       this.dominio = dominio
       this.imagen = imagen
       this.motivoDenuncia = motivoDenuncia
      
    }

    static FromJson(denunciaJson){
        const result = Object.assign(new Denuncia(), denunciaJson)
        return result
    }
}