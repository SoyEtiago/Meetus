const express = require('express')

const eventoController = require('../controllers/eventController')

const router = express.Router()


router.get('/events/all', (req, res) => {
  res.send('LISTARÁ TODOS LOS EVENTOS');
})

router.post('/events/new', eventoController.crearEvento)


module.exports = router