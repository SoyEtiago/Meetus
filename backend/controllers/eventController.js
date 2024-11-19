const mongoose = require('mongoose')
const Evento = require('../models/eventoModel')
const Usuario = require('../models/usuarioModel')

const crearEvento = async (req, res) => {
  try {
    const { nombre, descripcion, fecha, hora, lugar, organizadorId } = req.body;

    const nuevoEvento = new Evento({
      nombre,
      organizadorId,
      descripcion,
      fecha,
      hora,
      lugar,
    });

    const eventoGuardado = await nuevoEvento.save();
    const firebaseId = organizadorId;
    // Buscar al usuario y agregar el evento al campo eventosCreados
    const usuario = await Usuario.findOne({ firebaseId });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario organizador no encontrado" });
    }

    usuario.eventosCreados.push(eventoGuardado._id);
    await usuario.save();

    return res.status(201).json({
      message: "Evento creado exitosamente",
      event: eventoGuardado,
    });
  } catch (error) {

    return res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};


const registrarAsistente = async (req, res) => {
  const { eventoId, usuarioId } = req.body;

  console.log(eventoId, usuarioId)

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    if (evento.asistentes.includes(usuarioId)) {
      return res.status(400).json({ message: "El usuario ya está registrado como asistente" });
    }

    evento.asistentes.push(usuarioId);
    console.log(evento)
    await evento.save();

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    usuario.eventosRegistrados.push(eventoId);
    await usuario.save();

    return res.status(200).json({
      message: "Asistente registrado exitosamente",
      evento,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al registrar al asistente",
      error: error.message,
    });
  }
};

const listarEventos = async (req, res) => {
  try {
    // Obtener todos los eventos de la base de datos
    const eventos = await Evento.find();

    // Verificar si no hay eventos
    if (eventos.length === 0) {
      return res.status(404).json({
        message: "No se encontraron eventos",
      });
    }

    // Retornar la lista de eventos
    return res.status(200).json({
      message: "Eventos obtenidos exitosamente",
      events: eventos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los eventos",
      error: error.message,
    });
  }
};


module.exports = {crearEvento, listarEventos, registrarAsistente}