
const mongoose = require("mongoose");

const RegistroPerinatal = mongoose.model(
  "RegistroPerinatal",
  new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = RegistroPerinatal;
