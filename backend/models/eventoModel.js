const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    organizadorId: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    hora: {
      type: String,
      required: true
    },
    lugar: {
      type: String,
      required: true
    },
    asistentes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    ]
  },
  { timestamps: true}
);

const Evento = mongoose.model('Evento', EventSchema)

module.exports = Evento
