const mongoose = require("mongoose");


const Control =  mongoose.model(
  "Control",
  new mongoose.Schema({
  fecha: Date,
  edad: Number,
  peso: Number,
  longitud: Number,
  perimetro: Number,
  lactmaterna: Boolean,
  otrasleches: Boolean,
  otrosalimento: Boolean,
  micronutrientes: Boolean,
  vitaminaA: Boolean,
  ninoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niños",
  },
})
);


module.exports = Control

