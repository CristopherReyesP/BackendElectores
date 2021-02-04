const { usuarioConectado, usuarioDesconectado, grabarVotante, EliminarVotante, EditarVotante } = require("../controllers/sockets");
const { guardarMarcador, mostrarMarcadores} = require("../controllers/marcadores");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {

    constructor( io ) {

        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ valido, uid ] = comprobarJWT(socket.handshake.query['x-token']);
            
            if (!valido) {
                console.log('socket no identificado');
                return socket.disconnect();
            }
            
            await usuarioConectado( uid );

            //Unir al usuario a una sala de socket.io
            socket.join( uid );
            //marcadores activos
            // socket.on('Inicial', async(usuario) =>{
            //     const marcadores = await mostrarMarcadores(usuario);
            //     socket.emit('Inicial', marcadores);
            // })
            //marcador nuevo 
            socket.on('marcador-nuevo', async( marcador ) =>{//{id, lng, lat}
                const marcadorGuardado = await guardarMarcador(marcador);
                this.io.emit('marcador-nuevo', marcadorGuardado );
            });

            //Editar votante
            socket.on( 'Editar', async( votante ) => {
                const editado = await EditarVotante(votante);
                this.io.emit('Editar', editado);
            });
            //Borrar votante
            socket.on( 'Eliminar', async( id ) => {
                const eliminado = await EliminarVotante(id);
                this.io.emit('Eliminar', eliminado);
            });
            //Grabar nuevo votante
            socket.on( 'Datos-Votante', async( payload ) => {

                const votante = await grabarVotante( payload );
                this.io.emit('Datos-Votante', votante);

            });
  
            socket.on('disconnect', async() => {
                await usuarioDesconectado(uid);
            });
            
        
        });
    }


}


module.exports = Sockets;