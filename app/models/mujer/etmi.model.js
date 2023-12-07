const mongoose = require("mongoose");


const ETMI =  mongoose.model(
  "ETMI",
  new mongoose.Schema({
  nombre: String,
  tamizajes: [
    {
      vacuna: String,
      fechaRealizacion: Date,
      resultado: String,
      semanaGestacion: Number,
    },
  ],
  mujerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mujer",
  },
})
);


module.exports = ETMI

