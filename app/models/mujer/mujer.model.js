const mongoose = require("mongoose");


const Mujer = mongoose.model(
  "Mujer",
  new mongoose.Schema({
    hcu: String,
    cedula: String,
    nombres: String,
    apellidos: String,
    discapacidad: String,
    telfdomicilio: String,
    celular: String,
    direccion: String,
    zona: String,
    provincia: String,
    canton: String,
    parroquia: String,
    establecimiento: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
  })
);




module.exports = Mujer;
