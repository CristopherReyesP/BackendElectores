const Usuario = require('../models/usuario');
const Votante = require('../models/votantes');

const usuarioConectado = async (uid) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async (uid) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const EliminarVotante = async (id) => {
    try {
        await Votante.findByIdAndDelete(id);
        const votantesActualizados = await Votante.find();
        return (votantesActualizados);
    } catch (error) {
        console.log(error);
        return false;
    }
}

const EditarVotante = async (votante) => {
    try {
        const votanteEditado = await Votante.findByIdAndUpdate(votante._id, votante);
        return (votanteEditado);
    } catch (error) {
        console.log(error);
        return false;
    }
}

const grabarVotante = async (payload) => {
    try {
        const votante = new Votante(payload);
        await votante.save();
        return votante;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarVotante,
    EliminarVotante,
    EditarVotante
}