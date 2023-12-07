const db = require("../models");
const Control = db.control;

exports.createControl = async (req, res) => {
  try {
    const nuevoControl = new Control({
      ...req.body,
    });

    await nuevoControl.save();

    return res.status(201).json({ message: "Control creado exitosamente." });
  } catch (error) {
    console.error("Error al crear control:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllControls = async (req, res) => {
  try {
    const filter = req.query.ninoId ? { ninoId: req.query.ninoId } : {};
    const controles = await Control.find(filter);
    return res.status(200).json(controles);
  } catch (error) {
    console.error("Error al obtener todos los controles:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getControlById = async (req, res) => {
  try {
    const controlId = req.params.controlId;
    const controlEncontrado = await Control.findById(controlId);

    if (!controlEncontrado) {
      return res.status(404).json({ message: "Control no encontrado." });
    }

    return res.status(200).json(controlEncontrado);
  } catch (error) {
    console.error("Error al obtener control por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateControl = async (req, res) => {
  try {
    const controlId = req.params.controlId;
    const { /* otros campos */ } = req.body;

    const controlActualizado = await Control.findByIdAndUpdate(controlId, req.body);

    if (!controlActualizado) {
      return res.status(404).json({ message: "Control no encontrado." });
    }

    await controlActualizado.save();

    return res.status(200).json({ message: "Control actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar control:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteControl = async (req, res) => {
  try {
    const controlId = req.params.controlId;
    const controlEliminar = await Control.findById(controlId);

    if (!controlEliminar) {
      return res.status(404).json({ message: "Control no encontrado." });
    }

    await controlEliminar.remove();

    return res.status(200).json({ message: "Control eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar control:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
