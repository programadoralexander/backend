const mongoose = require("mongoose");


const RN =  mongoose.model(
  "RN",
  new mongoose.Schema({
  pesonacer: Number,
  pcefalico: Number,
  longitud: Number,
  sem: Number,
  dias: Number,
  pesoeg: String,
  apgar1: Number,
  apgar2: Number,
  apgar3: Number,
  estimulac: Boolean,
  aspiracion: Boolean,
  mascara: Boolean,
  bolsa: Boolean,
  tuboendotraq: Boolean,
  masajec: Boolean,
  medicacion: Boolean,
  
  //atendio partos
  partomedico: Boolean,
  partoobst: Boolean,
  partoenf: Boolean,
  partoauxil: Boolean,
  partoestud: Boolean,
  partoempir: Boolean,
  partootro: Boolean,

  neomedico: Boolean,
  neoobst: Boolean,
  neoenf: Boolean,
  neoauxil: Boolean,
  neoestud: Boolean,
  neoempir: Boolean,
  neootro: Boolean,
  
  //lugar parto
  establesalud: Boolean,
  domicilio: Boolean,
  otro: Boolean,
  


  //metodo canguro
  metodocanguro: Boolean,

  //examen
  examenfisico: Boolean,
  
  //defectos
  defectoscongenitos: Boolean,
  valordefectoscongenitos: String,

  
  //
  tipificacion: String,
  vitaminaK: Boolean,
  profilaxis: Boolean,

  //enfermedades
  enfermedades: Boolean,
  valorenfermedades: String,


  //
  tamizajemeta: Boolean,
  tamizajeaudi: Boolean,

  apego: Boolean,
  ligaduracordon: Boolean,
  meconio: Boolean,
  lactanciainmediata: Boolean,

   //EGRESO RN 
  pesoegreso: Number,
  fechaalta: Date,
  //alimento alta
  lactanciaexclusiva: Boolean,
  parcial: Boolean,
  artificial: Boolean,
  lechehumana: Boolean,

   //egreso 
  responsableegreso: String,


  ninoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Niños",
  },
})
);


module.exports = RN

