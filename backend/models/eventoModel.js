const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    asistentes: [
      {
        usuario_id: {
          type: String,
          required: true,
          ref: "usuarios",
        },
        nombre: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true}
);

const Evento = mongoose.model('Evento', EventSchema)

module.exports = Evento
