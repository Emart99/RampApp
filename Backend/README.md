# RampApp Backend (Rest Api)

### Dependencias
Jvm 14 \
Mysql

## Endpoints disponibles

### Para la Rampa

`GET /rampasDisponibles`\
*Devuelve todas las rampas que se encuentran Disponible*

`GET /rampaDisponible/{id}`\
*Permite buscar una rampa dado su id*

`PUT /agregarRampa/{idUsuario}`\
*crea una rampa dado un requestBody y se la linkea al usuario por id*
**requestBody**
>{\
&ensp;"posx": "posx"\
&ensp;"posy": "posy"\
&ensp;"calle": "calle"\
&ensp;"altura": "altura"\
&ensp;"nroPartidaInmobiliaria": "nroPartidaInmobiliaria"\
&ensp;"imagenRampa": "imagenRampa"\
&ensp;"imagenDni": "imagenDni"\
&ensp;"imagenEscritura": "imagenEscritura"\
>}

`PUT /verificarPropiedadRampa/{idUsuario}`\
*crea una rampa ya registrada y se la agrega al usuario*
**requestBody**
>{\
&ensp;"posx": "posx"\
&ensp;"posy": "posy"\
&ensp;"calle": "calle"\
&ensp;"altura": "altura"\
&ensp;"nroPartidaInmobiliaria": "nroPartidaInmobiliaria"\
&ensp;"imagenRampa": "imagenRampa"\
&ensp;"imagenDni": "imagenDni"\
&ensp;"imagenEscritura": "imagenEscritura"\
>}

`PUT /agregarHorarioRampa/{idRampa}`\
*permite agregar un horario de disponibilidad de la rampa dado su id*
**requestBody**
>{\
&ensp;"horarios[]": "[]"\
>}

`DELETE /eliminarHorarioRampa/{idRampa}`\
*deshabilita la rampa dado un id de rampa (el nombre no es el mejor)*

`PUT /reservarRampa/{idRampa}/{idUsuario}/{dominioVehiculo}`\
*permite agregar reservar una rampa dado un id de rampa un idUsuario y un dominio de vehiculo y las reservas por requestBody*
**requestBody**
>{\
&ensp;"horaInicioReserva": "horaInicioReserva"\
&ensp;"horaFinReserva": "horaFinReserva"\
&ensp;"importePagado": "importePagado"\
>}

### Para el Usuario

`POST /usuario/login`\
*Recibe usuario y contraseña por body y devuelve los datos del usuario si matchea de lo contrario, un error*\
**requestBody**:
>{\
    &ensp;"usuario": "username"\
    &ensp;"contraseña": "password"\
>}

`GET /usuario/{id}`\
*Devuelve usuario dado un id*\

`PUT /usuario/registrar`\
**requestBody**\
*crea un usuario que no esta registrado con Dni*
>{\
&ensp;"nombre": "_nombre"\
&ensp;"apellido": "_apellido"\
&ensp;"dni": "_dni"\
&ensp;"fechaDeNacimiento": "_fechaDeNacimiento"\
&ensp;"username": "_username"\
&ensp;"contraseña": "_contraseña"\
&ensp;"email": "_email"\
>}

`PUT /agregarVehiculo/{idUsuario}`\
*permite agregar un vehiculo no registrado (necesita id usuario por path y un vehiculo por requestBody)*\
**requestBody**
>{\
&ensp;"marca": "_marca"\
&ensp;"modelo": "_modelo"\
&ensp;"dominio": "_dominio"\
>}

`DELETE /eliminarVehiculo/{idUsuario}/{idVehiculo}`\
*Permite eliminar un vehiculo dado un id de usuario y un id vehiculo perteneciente al usuario*

`PUT /realizarDenuncia/{idUsuario}`\
*realiza una denuncia dado un id de usuario y un request body*
**requestBody**
>{\
&ensp;"motivoDenuncia": "_motivo"\
&ensp;"dominio": "_dominio"\
&ensp;"direccionRampa": "_direccion"\
&ensp;"imagen": "_imagen"\
>}

`GET /usuario/rampasPropias/{idUsuario}`\
*devuelve las rampas de un usuario dado su id*

`GET /usuario/vehiculosPropios/{idUsuario}`\
*devuelve los vehiculos de un usuario dado su id (de usuario obviamente)*

`GET /usuario/reservasActivas/{idUsuario}`\
*devuelve las reservas activas de un usuario dado su id*

`GET /usuario/carrito/{idUsuario}`\
*devuelve el carrito del usuario dado su id*

`POST /usuario/carrito/{idUsuario}/pagar`\
*paga el carrito del usuario dado su id (este metodo esta incompleto)*

`DELETE /usuario/carrito/{idUsuario}/borrar/{idReserva}`\
*borra un elemento del carrito (dado el id del usuario y el id de reserva)*

### Para el Vehiculo
`PUT /modificarVehiculo/{idVehiculo}`\
*permite editar un vehiculo dado un idVehiculo sumado a los cambios a los datos por requestBody*
>{\
&ensp;"vehiculoId": "_vehiculoId"`\
&ensp;"marca": "_marca"\
&ensp;"modelo": "_modelo"\
&ensp;" dominio": "_dominio"\
>}

### Para el Administrador
`POST /administrador/login`\
*Devuelve el admin cuyo username y contraseña coincide con lo que pasamos como parámetro*
**requestBody**
>{\
&ensp;"username": "username"`\
&ensp;"password": "password"\
>}
>
`GET /administrador/habilitarRampa/{idRampa}`\
*El admin habilita una rampa pendiente de aprobacion*

`GET /administrador/rechazarRampa/{idRampa}`\
*El admin rechaza una rampa pendiente de aprobacion*

`GET /administrador/rampasPendientesAprobacion`\
*Devuelve todas las rampas que se encuentran pendientes de aprobacion*

`GET /administrador/rampasPendientesAprobacion/{idRampa}`\
*Devuelve una rampa pendiente dado su id*

`GET administrador/denunciasPendientesAprobacion`\
*Devuelve todas las denuncias que se encuentran pendientes de aprobacion*

`GET /administrador/traerDenuncia/{idDenuncia}`\
*Devuelve una denincia por id*

`GET /administrador/aprobarDenuncia/{idDenuncia}`\
*El admin aprueba una denuncia pendiente (tal vez deberia ser post o put o incluso patch)*

`GET /administrador/rechazarDenuncia/{idDenuncia}`\
*El admin rechaza una denuncia pendiente (idem aclaracion de arriba)*

`GET /administrador/obtenerBalance/{fechaBusqueda}`\
*El admin obtiene el balance del uso de rampas dado un dia de la forma yyyy-MM-dd*
