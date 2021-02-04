const Votantes  = require('../models/votantes');


const obtenerVotante = async(req, res) => {

 
    const miId = req.params.uid;

    const votantes = await Votantes.find({
        $or: [

            { digitador: miId },//Si es candidato va a buscar donde digitador:miID
            { candidato: miId },// si es un candidato  va a buscar donde candidato:miId
                                // si es un digitador no va a encontrar ningun candidato con su id
        ]
    })
    .sort({ createdAt: 'desc' });

    res.json( votantes );

}

const obtenerTodoslosVotantes = async(req, res) => {

    const votantes = await Votantes.find();
    res.json( votantes );

}

module.exports = {
    obtenerVotante,
    obtenerTodoslosVotantes
}