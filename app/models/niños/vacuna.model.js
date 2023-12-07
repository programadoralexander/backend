const mongoose = require("mongoose");


const Vacuna =  mongoose.model(
  "Vacuna",
  new mongoose.Schema({
  clasificacion: String,
  esquema: [
    {
      tipovacuna: String,
      dosis: Number,
      fechaaplicacion: Date,
      edadapli: Number,
      lote: String,
      vacunador: String,
      establecimiento: String,
    },
  ],
  ninoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niños",
  },
})
);


module.exports = Vacuna

