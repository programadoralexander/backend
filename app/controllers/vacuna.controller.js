const db = require("../models");
const Vacuna = db.vacuna;

exports.createVacuna = async (req, res) => {
  try {
    const nuevaVacuna = new Vacuna({
      ...req.body,
    });

    await nuevaVacuna.save();

    return res.status(201).json({ message: "Vacuna creada exitosamente." });
  } catch (error) {
    console.error("Error al crear vacuna:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllVacunas = async (req, res) => {
  try {
    const filter = req.query.ninoId ? { ninoId: req.query.ninoId } : {};
    const vacunas = await Vacuna.find(filter);
    return res.status(200).json(vacunas);
  } catch (error) {
    console.error("Error al obtener todas las vacunas:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getVacunaById = async (req, res) => {
  try {
    const vacunaId = req.params.vacunaId;
    const vacunaEncontrada = await Vacuna.findById(vacunaId);

    if (!vacunaEncontrada) {
      return res.status(404).json({ message: "Vacuna no encontrada." });
    }

    return res.status(200).json(vacunaEncontrada);
  } catch (error) {
    console.error("Error al obtener vacuna por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateVacuna = async (req, res) => {
  try {
    const vacunaId = req.params.vacunaId;
    const { /* otros campos */ } = req.body;

    const vacunaActualizada = await Vacuna.findByIdAndUpdate(vacunaId, req.body);

    if (!vacunaActualizada) {
      return res.status(404).json({ message: "Vacuna no encontrada." });
    }

    await vacunaActualizada.save();

    return res.status(200).json({ message: "Vacuna actualizada exitosamente." });
  } catch (error) {
    console.error("Error al actualizar vacuna:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteVacuna = async (req, res) => {
  try {
    const vacunaId = req.params.vacunaId;
    const vacunaEliminar = await Vacuna.findById(vacunaId);

    if (!vacunaEliminar) {
      return res.status(404).json({ message: "Vacuna no encontrada." });
    }

    await vacunaEliminar.remove();

    return res.status(200).json({ message: "Vacuna eliminada exitosamente." });
  } catch (error) {
    console.error("Error al eliminar vacuna:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
