const Usuarios = require('../models/usuario');

const obtenerUsuario = async(req, res) => {

    const roles = req.params.rol;
    const usuarios = await Usuarios.find(
        {rol: roles }
        );
        
    res.json(usuarios);
    
}

const obtenerTodoslosUsuarios  = async(req, res) => {

    const usuarios = await Usuarios.find();
    res.json( usuarios );

}

module.exports = {
    obtenerUsuario,
    obtenerTodoslosUsuarios  
}