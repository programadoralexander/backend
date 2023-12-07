const db = require("../models");
const ControlMujer = db.controlmujer;

exports.createControlMujer = async (req, res) => {
  try {
    const controlMujer = new ControlMujer({
      ...req.body,
    });

    await controlMujer.save();

    return res.status(201).json({ message: "Control de mujer creado exitosamente." });
  } catch (error) {
    console.error("Error al crear control de mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllControlesMujer = async (req, res) => {
  try {
    const filter = req.query.mujerId ? { mujerId: req.query.mujerId } : {};
    const controlesMujer = await ControlMujer.find(filter).populate('mujerId');
    return res.status(200).json(controlesMujer);
  } catch (error) {
    console.error("Error al obtener todos los controles de mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getControlMujerById = async (req, res) => {
  try {
    const controlMujerId = req.params.controlMujerId;
    const controlMujer = await ControlMujer.findById(controlMujerId);

    if (!controlMujer) {
      return res.status(404).json({ message: "Control de mujer no encontrado." });
    }

    return res.status(200).json(controlMujer);
  } catch (error) {
    console.error("Error al obtener control de mujer por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateControlMujer = async (req, res) => {
  try {
    const controlMujerId = req.params.controlMujerId;
    const { /* otros campos */ } = req.body;

    const controlMujer = await ControlMujer.findById(controlMujerId);

    if (!controlMujer) {
      return res.status(404).json({ message: "Control de mujer no encontrado." });
    }

    // Actualiza los campos necesarios
    // controlMujer.campo = req.body.campo;

    await controlMujer.save();

    return res.status(200).json({ message: "Control de mujer actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar control de mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteControlMujer = async (req, res) => {
  try {
    const controlMujerId = req.params.controlMujerId;
    const controlMujer = await ControlMujer.findById(controlMujerId);

    if (!controlMujer) {
      return res.status(404).json({ message: "Control de mujer no encontrado." });
    }

    await controlMujer.remove();

    return res.status(200).json({ message: "Control de mujer eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar control de mujer:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
