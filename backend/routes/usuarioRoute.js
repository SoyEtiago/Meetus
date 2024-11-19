const express = require('express')

const usuarioController = require('../controllers/usuarioController')

const router = express.Router()

router.post('/users/new', usuarioController.registrarUsuario)
router.get('/users/:firebaseId', usuarioController.obtenerUsuarioPorFirebaseId);

module.exports = router