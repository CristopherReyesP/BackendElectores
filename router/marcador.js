/*
    path: api/marcador
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { mostrarMarcadores } = require('../controllers/marcadores');

const router = Router();

router.get('/:uid', validarJWT, mostrarMarcadores)

module.exports = router;