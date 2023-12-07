const mongoose = require("mongoose");


const Niños = mongoose.model(
  "Niños",
  new mongoose.Schema({
    hcu: String,
    cedula: String,
    cedulamadre: String,
    nombres: String,
    apellidos: String,
    discapacidad: String,
    detalleDiscapacidad: String,
    fechanacimiento: Date,
    telfdomicilio: String,
    celular: String,
    direccion: String,
    nombrePadres: String,
    zona: String,
    provincia: String,
    canton: String,
    parroquia: String,
    establecimiento: String,
    sexo: String,
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




module.exports = Niños;
