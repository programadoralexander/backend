// rn.controller.js
const db = require("../models");
const RN = db.rn; // Asumiendo que has exportado el modelo RN

exports.createRN = async (req, res) => {
  try {
    const rn = new RN({
      ...req.body,
    });

    await rn.save();

    return res.status(201).json({ message: "Recién nacido creado exitosamente." });
  } catch (error) {
    console.error("Error al crear recién nacido:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllRN = async (req, res) => {
  try {
    const filter = req.query.ninoId ? { ninoId: req.query.ninoId } : {};
    const recienNacidos = await RN.find(filter).populate('createdBy', 'cedula');
    return res.status(200).json(recienNacidos);
  } catch (error) {
    console.error("Error al obtener todos los recién nacidos:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getRNById = async (req, res) => {
  try {
    const rnId = req.params.rnId;
    const recienNacido = await RN.findById(rnId);

    if (!recienNacido) {
      return res.status(404).json({ message: "Recién nacido no encontrado." });
    }

    return res.status(200).json(recienNacido);
  } catch (error) {
    console.error("Error al obtener recién nacido por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateRN = async (req, res) => {
  try {
    const rnId = req.params.rnId;
    const { /* otros campos */ } = req.body;

    const recienNacido = await RN.findByIdAndUpdate(rnId, req.body);

    if (!recienNacido) {
      return res.status(404).json({ message: "Recién nacido no encontrado." });
    }

    await recienNacido.save();

    return res.status(200).json({ message: "Recién nacido actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar recién nacido:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteRN = async (req, res) => {
  try {
    const rnId = req.params.rnId;
    const recienNacido = await RN.findById(rnId);

    if (!recienNacido) {
      return res.status(404).json({ message: "Recién nacido no encontrado." });
    }

    await recienNacido.remove();

    return res.status(200).json({ message: "Recién nacido eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar recién nacido:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
