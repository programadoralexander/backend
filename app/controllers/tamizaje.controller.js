const db = require("../models");
const Tamizaje = db.tamizaje;

exports.createTamizaje = async (req, res) => {
  try {
    const nuevoTamizaje = new Tamizaje({
      ...req.body,
    });

    await nuevoTamizaje.save();

    return res.status(201).json({ message: "Tamizaje creado exitosamente." });
  } catch (error) {
    console.error("Error al crear tamizaje:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllTamizajes = async (req, res) => {
  try {
    const filter = req.query.ninoId ? { ninoId: req.query.ninoId } : {};
    const tamizajes = await Tamizaje.find(filter);
    return res.status(200).json(tamizajes);
  } catch (error) {
    console.error("Error al obtener todos los tamizajes:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getTamizajeById = async (req, res) => {
  try {
    const tamizajeId = req.params.tamizajeId;
    const tamizajeEncontrado = await Tamizaje.findById(tamizajeId);

    if (!tamizajeEncontrado) {
      return res.status(404).json({ message: "Tamizaje no encontrado." });
    }

    return res.status(200).json(tamizajeEncontrado);
  } catch (error) {
    console.error("Error al obtener tamizaje por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateTamizaje = async (req, res) => {
  try {
    const tamizajeId = req.params.tamizajeId;
    const { /* otros campos */ } = req.body;

    const tamizajeActualizado = await Tamizaje.findByIdAndUpdate(tamizajeId, req.body);

    if (!tamizajeActualizado) {
      return res.status(404).json({ message: "Tamizaje no encontrado." });
    }

    await tamizajeActualizado.save();

    return res.status(200).json({ message: "Tamizaje actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar tamizaje:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteTamizaje = async (req, res) => {
  try {
    const tamizajeId = req.params.tamizajeId;
    const tamizajeEliminar = await Tamizaje.findById(tamizajeId);

    if (!tamizajeEliminar) {
      return res.status(404).json({ message: "Tamizaje no encontrado." });
    }

    await tamizajeEliminar.remove();

    return res.status(200).json({ message: "Tamizaje eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar tamizaje:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
