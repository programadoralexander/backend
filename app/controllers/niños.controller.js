// niños.controller.js
const db = require("../models");
const Niño = db.niños;

exports.createNiño = async (req, res) => {
  try {
    const niño = new Niño({
      ...req.body,
    });

    await niño.save();

    return res.status(201).json({ message: "Niño creado exitosamente." });
  } catch (error) {
    console.error("Error al crear niño:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllNiños = async (req, res) => {
  try {
    const niños = await Niño.find().populate('createdBy', 'cedula');
    return res.status(200).json(niños);
  } catch (error) {
    console.error("Error al obtener todos los niños:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getNiñoById = async (req, res) => {
  try {
    const ninoId = req.params.ninoId;
    const niño = await Niño.findById(ninoId);

    if (!niño) {
      return res.status(404).json({ message: "Niño no encontrado." });
    }

    return res.status(200).json(niño);
  } catch (error) {
    console.error("Error al obtener niño por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateNiño = async (req, res) => {
  try {
    const ninoId = req.params.ninoId;
    const { /* otros campos */ } = req.body;

    const niño = await Niño.findByIdAndUpdate(ninoId, req.body);

    if (!niño) {
      return res.status(404).json({ message: "Niño no encontrado." });
    }

    await niño.save();

    return res.status(200).json({ message: "Niño actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar niño:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteNiño = async (req, res) => {
  try {
    const ninoId = req.params.ninoId;
    const niño = await Niño.findById(ninoId);

    if (!niño) {
      return res.status(404).json({ message: "Niño no encontrado." });
    }

    await niño.remove();

    return res.status(200).json({ message: "Niño eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar niño:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
