const mongoose = require("mongoose");


const ControlMujer =  mongoose.model(
  "ControlMujer",
  new mongoose.Schema({
  fechaatencion: Date,
  fechaproxima: Date,
  nombrevacunador: String,
  observacion: String,
  mujerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mujer",
  },
})
);


module.exports = ControlMujer

