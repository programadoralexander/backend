const mongoose = require("mongoose");


const Tamizaje =  mongoose.model(
  "Tamizaje",
  new mongoose.Schema({
  clasificacion: String,
  esquema: [
    {
      fechaaplicacion: Date,
      edadapli: Number,
      resultadonormal: Boolean,
      observacion: String,
    },
  ],
  ninoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niños",
  },
})
);


module.exports = Tamizaje

