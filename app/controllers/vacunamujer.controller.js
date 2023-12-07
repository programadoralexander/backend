const db = require("../models");
const VacunaMujer = db.vacunamujer;

exports.createVacunaMujer = async (req, res) => {
  try {
    const vacunaMujer = new VacunaMujer({
      ...req.body,
    });

    await vacunaMujer.save();

    return res.status(201).json({ message: "Vacuna de mujer creada exitosamente." });
  } catch (error) {
    console.error("Error al crear vacuna de mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllVacunasMujer = async (req, res) => {
  try {
    const filter = req.query.mujerId ? { mujerId: req.query.mujerId } : {};
    const vacunasMujer = await VacunaMujer.find(filter).populate('mujerId');
    return res.status(200).json(vacunasMujer);
  } catch (error) {
    console.error("Error al obtener todas las vacunas de mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getVacunaMujerById = async (req, res) => {
  try {
    const vacunaMujerId = req.params.vacunaMujerId;
    const vacunaMujer = await VacunaMujer.findById(vacunaMujerId);

    if (!vacunaMujer) {
      return res.status(404).json({ message: "Vacuna de mujer no encontrada." });
    }

    return res.status(200).json(vacunaMujer);
  } catch (error) {
    console.error("Error al obtener vacuna de mujer por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateVacunaMujer = async (req, res) => {
  try {
    const vacunaMujerId = req.params.vacunaMujerId;
    const { /* otros campos */ } = req.body;

    const vacunaMujer = await VacunaMujer.findById(vacunaMujerId);

    if (!vacunaMujer) {
      return res.status(404).json({ message: "Vacuna de mujer no encontrada." });
    }

    // Actualiza los campos necesarios
    // vacunaMujer.campo = req.body.campo;

    await vacunaMujer.save();

    return res.status(200).json({ message: "Vacuna de mujer actualizada exitosamente." });
  } catch (error) {
    console.error("Error al actualizar vacuna de mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteVacunaMujer = async (req, res) => {
  try {
    const vacunaMujerId = req.params.vacunaMujerId;
    const vacunaMujer = await VacunaMujer.findById(vacunaMujerId);

    if (!vacunaMujer) {
      return res.status(404).json({ message: "Vacuna de mujer no encontrada." });
    }

    await vacunaMujer.remove();

    return res.status(200).json({ message: "Vacuna de mujer eliminada exitosamente." });
  } catch (error) {
    console.error("Error al eliminar vacuna de mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
