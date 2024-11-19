const express = require('express')

const eventoController = require('../controllers/eventController')

const router = express.Router()


router.get('/events/all', eventoController.listarEventos)
router.post('/events/new', eventoController.crearEvento)
router.post('/events/register-attendee', eventoController.registrarAsistente);

module.exports = router