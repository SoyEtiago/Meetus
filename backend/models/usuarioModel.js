const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
  },
  eventosRegistrados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'eventos',
  }],
  eventosCreados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'eventos',
  }],
  firebaseId: {
    type: String,
    unique: true
  }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;