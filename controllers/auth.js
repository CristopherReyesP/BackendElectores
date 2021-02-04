const { response } = require("express");
const bcrypt       = require('bcryptjs');
const Usuario      = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const usuario = require("../models/usuario");

const crearUsuario = async (req, res = response) => {
    try {
        const { password, email } = req.body;
        //verificar que el email no exista
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg:'El correo ya existe'
            });
        } 
        const usuario = new Usuario(req.body);
        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        //GUardad en BD
        await usuario.save();
        //Generar JWT
        const token = await generarJWT( usuario.id );
        res.json({
            ok: true,
            usuario,
            token
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

const EditarUsuarioYEncriptar = async (req, res = response) => {
    try {
        const { email, password, nombre, rol, vinculo, uid } = req.body;
        //encriptar password
        const salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync(password, salt);
        //Editar en BD
        const usuario = await Usuario.findByIdAndUpdate(uid, {
            'email': email, 
            'password':pass, 
            'nombre': nombre, 
            'rol':rol, 
            'vinculo':vinculo, 
            '_id':uid});
        //Generar JWT
        const token = await generarJWT( usuario.id );
        res.json({
            ok: true,
            usuario,
            token
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

const EditarUsuarioSInEncriptar = async (req, res = response) => {
    try {
        const {email, password, nombre, rol, vinculo, uid} = req.body;
        const usuario = await Usuario.findByIdAndUpdate(uid, {
            'email': email, 
            'password':password, 
            'nombre': nombre, 
            'rol':rol, 
            'vinculo':vinculo, 
            '_id':uid});

        //Generar JWT
        const token = await generarJWT( usuario.id );
        res.json({
            ok: true,
            usuario,
            token
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

//Login
const login = async (req, res = response) => {
    const { password, email } = req.body;
    try {
        //verificar si el correo existe
        const usuarioDB = await usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no encontrado'
            });   
        }
        //validar password
        const validpassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validpassword ) {
            return res.status(400).json({
                ok: false,
                msg:'no es correcta'
            });
        }
        //Generar JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}

//renewToken 
const renewToken = async (req, res) => {
    const uid = req.uid;
    const vinculo = req.vinculo
   //Generar nuevo JWT
    const token = await generarJWT( uid, vinculo);
    //Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );
    res.json({
        ok: true,
        token,
        usuario   
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken,
    EditarUsuarioSInEncriptar,
    EditarUsuarioYEncriptar

}