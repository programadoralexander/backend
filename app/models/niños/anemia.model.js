const mongoose = require("mongoose");


const Anemia =  mongoose.model(
  "Anemia",
  new mongoose.Schema({
    fechaaplicacion: Date,
    edadapli: Number,
    valorhemoglobina: Number,
    valorcorregido: Number,
    resultadonormal: Boolean,
    tratamiento: Boolean,
    observacion: String,
  ninoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niños",
  },
})
);


module.exports = Anemia

