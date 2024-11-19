const mongoose = require('mongoose')
const Usuario = require('../models/usuarioModel')

const registrarUsuario = async (req, res) => {
  const {
    nombre,
    email,
    hashedPassword,
    firebaseId,
  } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      hashedPassword,
      firebaseId,
    });

    await nuevoUsuario.save();

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
}

// Listar usuario por firebaseId
const obtenerUsuarioPorFirebaseId = async (req, res) => {
  const { firebaseId } = req.params;

  try {
    const usuario = await Usuario.findOne({ firebaseId });
    
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      message: "Usuario encontrado exitosamente",
      usuario,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

module.exports = {registrarUsuario, obtenerUsuarioPorFirebaseId};
