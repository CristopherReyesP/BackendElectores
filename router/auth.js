/*
    path: api/login
*/

const { Router } = require('express');
const { check }  = require('express-validator');

//CONTROLADORES
const { crearUsuario, login, renewToken, EditarUsuarioSInEncriptar, EditarUsuarioYEncriptar } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//CREAR NUEVOS USARIOS
router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('rol','El rol es obligatorio').not().isEmpty(),
    check('vinculo','El Vínculo es obligatorio').not().isEmpty(),
    validarCampos 
], crearUsuario);

//Editar usuario sin encriptar password
router.post('/EditarSinEncriptar',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('rol','El rol es obligatorio').not().isEmpty(),
    check('vinculo','El Vínculo es obligatorio').not().isEmpty(),
    check('uid','El UID es obligatorio').not().isEmpty(),
    validarCampos 
], EditarUsuarioSInEncriptar);

//Editar usuario y encriptar password
router.post('/EditarYEncriptar',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('rol','El rol es obligatorio').not().isEmpty(),
    check('vinculo','El Vínculo es obligatorio').not().isEmpty(),
    check('uid','El UID es obligatorio').not().isEmpty(),
    validarCampos 
], EditarUsuarioYEncriptar);

//LOGIN
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatori0').not().isEmpty(),
    validarCampos    
] ,login );

//RENOVAR TOKEN
router.get('/renew', validarJWT, renewToken );



module.exports = router;