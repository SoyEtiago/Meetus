const mongoose = require('mongoose')
const Evento = require('../models/eventoModel')

const crearEvento = async(req, res) => {
  const {
    nombre,
    descripcion,
  } = req.body;

  const nuevoEvento = new Evento({
    nombre,
    descripcion,
  });

  nuevoEvento.save()
  return res.status(201).json({
    message: 'Evento creado exitosamente',
    event: nuevoEvento,
  });
}

module.exports = {crearEvento}