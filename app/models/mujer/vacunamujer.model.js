const mongoose = require("mongoose");


const VacunaMujer =  mongoose.model(
  "VacunaMujer",
  new mongoose.Schema({
  tipo: String,
  dosis: Number,
  fechaaplicacion: Date,
  edadapli: Number,
  lote: String,
  vacunador: String,
  nombrevacuna: String,
  establecimiento: String,
  mujerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mujer",
  },
})
);


module.exports = VacunaMujer

