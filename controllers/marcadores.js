const Marcador = require('../models/marcador');

const guardarMarcador = async(marcador)=>{

    try {    
        const marcadorNuevo = new Marcador(marcador);
        await marcadorNuevo.save();
        return marcadorNuevo;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const mostrarMarcadores = async(req, res) => {
    const miId = req.params.uid;
     marcadores = await Marcador.find({"usuario":miId});

     res.json(marcadores);

}

module.exports = {
    guardarMarcador,
    mostrarMarcadores
}