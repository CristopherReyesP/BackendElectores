
/* Path: api/votantes */

const {Router} = require('express');
const { obtenerVotante, obtenerTodoslosVotantes  } = require('../controllers/votantes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:uid', validarJWT, obtenerVotante );
router.get('/todos/votantes', validarJWT, obtenerTodoslosVotantes );

module.exports =  router;