// mujer.controller.js
const db = require("../models");
const Mujer = db.mujer;
const ETMI = db.etmi;

exports.createMujer = async (req, res) => {
  try {
    const mujer = new Mujer({
        ...req.body,
      });

    await mujer.save();

    return res.status(201).json({ message: "Mujer creada exitosamente." });
  } catch (error) {
    console.error("Error al crear mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllMujeres = async (req, res) => {
  try {
    const mujeres = await Mujer.find().populate('createdBy', 'cedula');
    return res.status(200).json(mujeres);
  } catch (error) {
    console.error("Error al obtener todas las mujeres:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getMujerById = async (req, res) => {
  try {
    const mujerId = req.params.mujerId;
    const mujer = await Mujer.findById(mujerId);

    if (!mujer) {
      return res.status(404).json({ message: "Mujer no encontrada." });
    }

    return res.status(200).json(mujer);
  } catch (error) {
    console.error("Error al obtener mujer por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateMujer = async (req, res) => {
  try {
    const mujerId = req.params.mujerId;
    const { /* otros campos */ } = req.body;

    const mujer = await Mujer.findByIdAndUpdate(mujerId, req.body);

    if (!mujer) {
      return res.status(404).json({ message: "Mujer no encontrada." });
    }


    await mujer.save();

    return res.status(200).json({ message: "Mujer actualizada exitosamente." });
  } catch (error) {
    console.error("Error al actualizar mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteMujer = async (req, res) => {
  try {
    const mujerId = req.params.mujerId;
    const mujer = await Mujer.findById(mujerId);
        

    if (!mujer) {
      return res.status(404).json({ message: "Mujer no encontrada." });
    }

    await ETMI.deleteMany({ mujerId: mujerId });


    await mujer.remove();

    return res.status(200).json({ message: "Mujer eliminada exitosamente." });
  } catch (error) {
    console.error("Error al eliminar mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
