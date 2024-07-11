export class Administrador {
    // eslint-disable-next-line
    constructor(id,nombre,apellido,cuil, userName,contrasenia ){
        this.id = id
        this.nombre = nombre
       this.apellido= apellido
       this.cuil= cuil
       this.userName = userName
       this.contrasenia = contrasenia

      
    }

    static FromJson(adminJson){
        const result = Object.assign(new Administrador(), adminJson)
        return result
    }
}
