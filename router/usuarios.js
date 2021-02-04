// path: api/usuarios

const {Router} = require('express');
const { obtenerUsuario, obtenerTodoslosUsuarios } = require('../controllers/usarios');

const router = Router();

router.get('/:rol',  obtenerUsuario );
router.get('/todoslos/usuarios',  obtenerTodoslosUsuarios );

module.exports = router;